// ALR Grading Terminal web app: offline support.
// Network first, so the app always gets the latest site when online; every successful
// response is kept, so the label tool still opens and downloads labels when offline.
const CACHE = 'alr-grading-v1';
const PRECACHE = [
  '/label-creator',
  '/label-creator.html',
  '/index.css',
  '/prescript.js',
  '/postscript.js',
  '/static/app/grading.webmanifest',
  '/static/app/icon-192.png',
  '/static/app/icon-512.png',
  '/static/fonts/inter-500.ttf',
  '/static/fonts/inter-600.ttf',
  '/static/fonts/inter-700.ttf',
  '/static/fonts/jetbrains-mono-400.ttf',
  'https://cdnjs.cloudflare.com/ajax/libs/opentype.js/1.3.4/opentype.min.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) =>
    Promise.all(PRECACHE.map((u) => c.add(new Request(u, { cache: 'reload' })).catch(() => {})))
  ).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k.startsWith('alr-grading-') && k !== CACHE).map((k) => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const ours = url.origin === self.location.origin;
  const allowed = ours || url.hostname === 'cdnjs.cloudflare.com' || url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com');
  if (!allowed) return;   // ads, analytics, accounts: straight to the network, never cached
  e.respondWith(
    fetch(req).then((res) => {
      if (res && (res.ok || res.type === 'opaque')) {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    }).catch(() =>
      caches.match(req, { ignoreSearch: true }).then((hit) =>
        hit || (req.mode === 'navigate'
          ? caches.match('/label-creator').then((p) => p || caches.match('/label-creator.html')).then((p) => p || Response.error())
          : Response.error())
      )
    )
  );
});
