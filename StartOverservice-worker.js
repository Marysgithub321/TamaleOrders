// Define a unique cache name
const CACHE_NAME = "Start-Over-Tamale-Order-cache-v1";

// List of resources to be cached
const urlsToCache = [
  "/",
  "/StartOverIndex.html",
  "/StartOverstyles.css",
  "/StartOvermain.js",
  "/StartOvermanifest.json",
  "/images/favicon-32x32.png",
  "/images/icon-192x192.png",
  "/images/icon-512x512.png",
];

// Install event: Add resources to cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache
        .addAll(urlsToCache)
        .then(() => console.log("Resources added to cache"))
        .catch((error) =>
          console.error("Failed to add resources to cache", error)
        );
    })
  );
});

// Fetch event: Serve cached resources or fetch from network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // If resource is found in cache, return it
      if (response) {
        return response;
      }
      // Otherwise, fetch the resource from the network
      return fetch(event.request);
    })
  );
});
