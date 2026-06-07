import { put, list } from '@vercel/blob';

export default async function handler(req, res) {
  // CORS Headers for local development
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const STORE_FILENAME = 'dk-global-store.json';

  try {
    if (req.method === 'GET') {
      // Fetch latest blob URL
      const { blobs } = await list({ prefix: STORE_FILENAME, token: process.env.BLOB_READ_WRITE_TOKEN });
      if (blobs.length > 0) {
        // Fetch the actual JSON content from the blob URL
        const response = await fetch(`${blobs[0].url}?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`
          }
        });
        const data = await response.json();
        return res.status(200).json(data);
      } else {
        // Return empty object if not found
        return res.status(200).json({});
      }
    } 
    
    else if (req.method === 'POST') {
      const data = req.body;
      const blob = await put(STORE_FILENAME, JSON.stringify(data), {
        access: 'private', // Use private access since the store is configured as private
        addRandomSuffix: false, // Override the same file
        allowOverwrite: true, // Allow overwriting the existing file
        token: process.env.BLOB_READ_WRITE_TOKEN,
        contentType: 'application/json'
      });
      return res.status(200).json({ success: true, url: blob.url });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (err) {
    console.error('Blob API Error:', err);
    return res.status(500).json({ error: err.message });
  }
}
