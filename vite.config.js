import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // 'prompt' (not 'autoUpdate'): a new deploy installs its service worker but
      // WAITS — the app shows a "Versi baru tersedia" banner and only reloads when
      // the user taps Perbarui. This keeps kids from being reloaded mid-quiz.
      // Offline is unaffected: the precache below still serves the whole app offline.
      registerType: 'prompt',
      includeAssets: [
        'favicon-32x32.png',
        'apple-touch-icon-180x180.png',
      ],
      manifest: {
        name: 'Detektif Kalimat – Belajar SPO',
        short_name: 'Detektif Kalimat',
        description:
          'Quiz interaktif belajar kalimat SPO (Subjek, Predikat, Objek). Jadi detektif kalimat dan temukan unsur-unsur kalimat!',
        lang: 'id',
        dir: 'ltr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#fff9f0',
        theme_color: '#f4a100',
        categories: ['education', 'kids'],
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the full app shell + all quiz images so the quiz works fully offline.
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,woff2}'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
        // SPA fallback for client-side (hash) routing, but never for the API.
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
        runtimeCaching: [
          {
            // Global store (admin config + leaderboard). Network-first so online
            // users always get the latest, but offline falls back to last response.
            urlPattern: ({ url }) => url.pathname.startsWith('/api/store'),
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'dk-api-store',
              // Was 4s — too aggressive on school Wi-Fi / mobile data, so the
              // installed app kept timing out and falling back to stale settings.
              // This is a tiny JSON payload; give the network room to actually win.
              networkTimeoutSeconds: 10,
              plugins: [
                {
                  // The client appends ?t=<timestamp> to bust the HTTP/CDN cache.
                  // Without normalizing, every request is a unique cache key, so the
                  // cache never keeps a usable "latest settings" entry: the offline
                  // fallback silently never hit and a timed-out read could resolve to
                  // a stale copy. Collapse to the bare pathname so there is exactly
                  // ONE entry that always reflects the newest settings.
                  cacheKeyWillBeUsed: async ({ request }) => {
                    const u = new URL(request.url);
                    u.search = '';
                    return u.href;
                  },
                },
              ],
              expiration: { maxEntries: 4, maxAgeSeconds: 60 * 60 * 24 * 30 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.googleapis.com',
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'google-fonts-stylesheets' },
          },
          {
            urlPattern: ({ url }) => url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 16, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
})
