const cacheName = "pwa-demo-cache";

self.addEventListener("install", function (event) {
  console.log("[INSTALL SW]");
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return fetch("/assets-manifest.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (assets) {
          console.log("add caches assets");
          return cache.addAll(Object.values(assets));
        })
        .catch((e) => {
          console.log("cannot get assets manifest", e);
        });
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return (
        response ||
        fetch(event.request)
          .then(function (response) {
            return caches.open(cacheName).then(function (cache) {
              cache.put(event.request, response.clone());
              return response;
            });
          })
          .catch(function () {})
      );
    })
  );
});
