import { list } from '@vercel/blob';
import fs from 'fs';

// Manually parse .env.local
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    env[match[1]] = value;
  }
});

const STORE_FILENAME = 'dk-global-store.json';
const token = env.BLOB_READ_WRITE_TOKEN;

async function run() {
  const { blobs } = await list({ prefix: STORE_FILENAME, token: token });
  if (blobs.length > 0) {
    const url = blobs[0].url;
    console.log("Fetching url with Bearer token header...");
    try {
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Status:", res.status);
      const text = await res.text();
      console.log("Content:", text);
    } catch (err) {
      console.error(err);
    }
  }
}

run();
