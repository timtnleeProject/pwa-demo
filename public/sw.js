const version = "#{version}";
const CACHE_NAME = "pwa-demo-cache-" + version;

self.addEventListener("install", function (event) {
  console.log("[INSTALL SW]");
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return fetch("/assets-manifest.json")
        .then(function (response) {
          return response.json();
        })
        .then(function (assets) {
          const list = Object.values(assets).filter(
            (path) => !path.match(/(images\/)|(icons\/)|(screenshots\/)/)
          );
          console.log("[ADD CACHES]: ", list);
          return cache.addAll(list);
        })
        .catch((e) => {
          console.log("cannot get assets manifest", e);
        });
    })
  );
});

self.addEventListener("fetch", function (event) {
  // console.log(`[FETCH EVENT FIRES: ${event.request.url}]`);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        // console.log(`[RETURN FROM CACHE ${event.request.url}]`);
        return response;
      }
      // console.log(`[FETCH ${event.request.url}]`);
      return fetch(event.request)
        .then(function (response) {
          if (
            event.request.method !== "GET" ||
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }
          const cloneResponse = response.clone();
          return caches
            .open(CACHE_NAME)
            .then(function (cache) {
              return cache.put(event.request, cloneResponse);
            })
            .then(function () {
              return response;
            });
        })
        .catch(function () {});
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("[ACTIVATE SW]");
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            console.log(`[CLEAR CACHE ${cacheName}]`);
            return caches.delete(cacheName);
          }
          return Promise.resolve();
        })
      );
    })
  );
});

self.addEventListener("push", function (event) {
  const options = event.data.json();
  const { title, ...rest } = options;
  const promiseChain = self.registration.showNotification(title, {
    icon: "icons/icon_x96.png",
    ...rest,
  });

  event.waitUntil(promiseChain);
});

self.addEventListener("notificationclick", function (event) {
  const clickedNotification = event.notification;
  clickedNotification.close();

  // Do something as the result of the notification click
  const url = clickedNotification.data?.url;
  if (url) {
    event.waitUntil(self.clients.openWindow(url));
  }
});

self.addEventListener("sync", function (event) {
  if (event.tag === "notify") {
    event.waitUntil(
      self.registration.showNotification("Background Sync", {
        icon: "icons/icon_x96.png",
      })
    );
  }
  console.log("SYNC", event);
});
