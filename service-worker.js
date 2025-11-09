const CACHE_NAME = "typing-arena-v1";
const urlsToCache = [
  "index.html",
  "test.html",
  "rewards.html",
  "history.html",
  "rank.html",
  "style.css",
  "script.js",
  "manifest.json"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
navigator.serviceWorker.getRegistrations().then(r => r.forEach(sw => sw.unregister()));
caches.keys().then(keys => keys.forEach(k => caches.delete(k)));
