/* Service Worker — Física 2026 unified (proposta + horário) v5 */
const CACHE = "fisica-josue-v16-nunito";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/wolf-192.png",
  "./icons/wolf-512.png",
  "./icons/wolf-maskable-192.png",
  "./icons/wolf-maskable-512.png",
  "./icons/wolf-apple-180.png",
  "./icons/wolf-favicon-32.png",
  "./icons/wolf-bg.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put("./index.html", copy));
          return res;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      // also try without query string
      return caches.match(url.pathname.replace(/.*\/horario/, ".")).then((c2) => {
        if (c2) return c2;
        return fetch(req).then((res) => {
          if (!res || res.status !== 200 || res.type === "error") return res;
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
          return res;
        });
      });
    })
  );
});

// Allow page to force update
self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
