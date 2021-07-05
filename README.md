# PWA DEMO

## Steps

Each step represent a coresponding branch name.

- initial_site: https://pwa-demo-git-initialsite-timtnleeproject.vercel.app/
- add_manifest: https://pwa-demo-git-addmanifest-timtnleeproject.vercel.app/
- main: https://pwa-demo-pi.vercel.app/

## 介紹

Progressive Web App

最早由 Google 提出，代表 web 開發技術創造有彈性(flexible)、可適應(adaptable) 的網路應用程序的準則和概念

開發者使用特定技術和標準模式，讓開發的 Web application 兼具網頁以及原生應用的優勢。

### web app > native app

* 可以透過搜引擎找到
* 可直接透過瀏覽器開啟、透過網址分享

### native app > web app

* 和作業系統相容性好，使用、操作體驗佳
* 可安裝，裝在桌面直接打開，比到瀏覽器瀏覽方便。

web app 優勢在於資訊的呈現
native app 優勢在於使用體驗和效能

PWA 讓應用程式有能力同時擁有這些優勢

## 怎麼樣算 PWA

PWA 並非一項單一技術，PWA代表的是一個建構應用程序的新思維，包含一些特定的 API 和功能。
當應用程序符合某些要求或實做了某些功能，就可以視為PWA。

辨別是否為 PWA 應用程式需要符合以下重要原則：

* Discoverability, 內容可以在搜尋引擎找到
    * Open Graph, meta tags
* Installable, 可以在桌面或應用啟動開啟
* Linkable, 可以藉由 URL 分享
* Netword independent, 沒有網路或網路連線不佳時依然能運作
    * 無網路情況下再次造訪網站，依舊可以取得部分內容
    * 網路不佳的情況下，使用者依然可以瀏覽先前瀏覽過的內容
    * 客製在無網路時要呈現的內容
* Progressive, 在舊的 browser 依然能有基本的功能，而在瀏覽器支援的情況下便能展示出完整的功能。
* Re-engageable, 可以在有新內容、活動時推送通知
* Responsive, 可在任何有螢幕和瀏覽器的裝置上使用、包含手機、平板、電腦等。
* Safe, 避免第三方取得敏感資料。
    * https...

## Benifits

* 在首次安裝之後，減少之後的載入時間
    * 使用 service workers
* 永遠都是最新的，不像 app 需要更新
* 和原生平台整合較好，例如在桌面有 app icon，可以使用全屏模式等等
* 使用系統的通知和推送訊息功能，可能有更多的用戶參與度和更高的轉化率

## manifest

manifest 是一種 json 格式文件，提供有關 App 安裝到 device 上所需的相關信息。

### Add manifest

```html
<link rel="manifest" href="js13kpwa.webmanifest">
```

需要在 <head/> 宣告 manifest 位置

也可以使用 `manifest.json` ，`.webmanifest` 則是有明確定義在 [w3c 規範](https://w3c.github.io/manifest/)

### 欄位

並非全部，大概介紹一下：

* name: app 名稱
* short_name
* description
* icons: 提供一系列不同大小的 icon，以便在不同裝置使用
```json
"icons": [
  {
    "src": "icon/lowres.webp",
    "sizes": "48x48",
    "type": "image/webp"
  },
  {
    "src": "icon/lowres",
    "sizes": "48x48"
  },
  {
    "src": "icon/hd_hi.ico",
    "sizes": "72x72 96x96 128x128 256x256"
  },
  {
    "src": "icon/hd_hi.svg",
    "sizes": "72x72"
  }
]
```
* start_url: app 入口
* display: 如何顯示, fullscreen, standalone, minimal-ui, or browser
* orientation: 預設顯示方向
* theme_color: 應用程式預設的主題顏色
* background_color: 啟動和載入
* prefer_related_applications: 是否要在 Web 應用程式上推薦指定的相關應用程式
* related_applications
```json
"related_applications": [
  {
    "platform": "play",
    "url": "https://play.google.com/store/apps/details?id=com.example.app1",
    "id": "com.example.app1"
  }, {
    "platform": "itunes",
    "url": "https://itunes.apple.com/app/example-app1/id123456789"
  }]
```
* iarc_rating_id: International Age Rating Coalition

### Maskable Icon
https://web.dev/maskable-icon/
會建議使用 maskable icon，以適應不同裝置(尤其是 android)上的 icon 
呈現。簡單來說就是周邊需要預留適當的空間，minimum safe zone，已在任何裝置都能完整顯示 icon

在 Android 上
* 一般 icon
![](https://web-dev.imgix.net/image/admin/jzjx6dGkXN9EdqnUzAeg.png?auto=format&w=439)
* maskable icon
![](https://web-dev.imgix.net/image/admin/J7gkg9ylP2ANlFawblze.png?auto=format&w=439)

可以使用工具幫助生成、調整成 maskable icon。

## browser install

各 browser install 行為不同
基本上都可以安裝(就算沒有 manifest 也可以手動安裝)
但是要達到 browser 認為是可以安裝的應用程式才會有某些特殊行為

https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Developer_guide/Installing


## service worker

sw 是可以在瀏覽器背景執行的 script，實現一些不需要網頁或使用者操作的功能，像是
* intercept and handle network requests
* [push notifications](https://developers.google.com/web/updates/2015/03/push-notifications-on-the-open-web)
* [background sync](https://developers.google.com/web/updates/2015/12/background-sync)

可以期待未來有更多支援的功能

* Service Woker 是 Javascript Worker，無法直接存取 Dom，而是透過 [postMessage](https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage) 來和頁面溝通
* 可以讓你控制頁面的 requests

以往比較常見的是 HTTP cache control
在本章節會使用 sw 實現 local cache 功能。
在網路最佳的狀況下，連接到 Web server 的時間也可能比讀取本地緩存數據所需的時間長幾個數量級。更何況在客戶端連接不太理想的情況下，從網絡取回第一個數據 (first byte) 所需的時間很容易超過渲染完整 HTML 所需的總時間 . 

### life cycle

https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

要使用 sw，需要先在頁面的 js 之中 **register** sw，瀏覽器會在背景進行 **install** 步驟

通常在 **install** 時會希望 **cache 特定的靜態資源** 如果成功便完成 (installed)，失敗的話則 sw 不會 activate，且會在下次瀏覽頁面時嘗試重新 install。

安裝成功 (**installed**)，進到 **activate** step，這是適合處理 old cache 的時機。

在 Activate 之後， sw 可以掌控所有 **scope** 底下的頁面。這邊要注意的是，初次 register 的頁面會執行 installing，進入 activated，但預設並不會被 service worker 控制 (onmessage, onfetch)，當下次加載頁面時才會被 sw controll。

當 sw 掌控頁面後，會有兩種可能的狀態
* 被終止 (**Terminated**) 以釋放記憶體
* 可以監聽 fetch/message events

![](https://i.imgur.com/GIPVv6s.png)

### register

```javascript=
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/sw.js", {
        scope: "/" // optional 指定想讓 sw 控制的內容目錄
    })
    .then((reg) => {
      console.log(`Register sw. Scope is ${reg.scope}`);
    })
    .catch((err) => {
      console.log(`Fail to register sw. ${err}`);
    });
}
```

在頁面的 JS file 裡執行 sw 註冊：先判斷是否支援 serviceworker, 指定 worker js file 的位置 (sw.js)

<!-- 
scope 指的是 worker 可以存取的範圍
如果指定 subpath，worker 就只能抓取 subpath 底下的 request -->

![](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers/important-notes.png)

* sw 必須運行在 https
* 雖然每次加載都呼叫 `register` ，不過瀏覽器會自行判斷 sw 是否已註冊並做出對應的處理。
* **scope**：sw 可以 control 的頁面，符合 scope 的頁面發出的 request 可以被 sw 攔截。sw 預設的 scope 為 sw script 的位置 (`/sw.js` 的 scope 為 `/` root)，也可以用 `register()` 第二個參數定義


在 `/sw.js` 裡面寫 service worker 的 code


```javascript
self.addEventListener("install", function (event) {
  //...
});
```

service worker 運行於 [ServiceWorkerGlobalScope](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorkerGlobalScope) 無法訪問 DOM，相關屬性和事件可去文件查看

<!-- ![](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers/sw-lifecycle.png) -->

### Install

接下來便是實作 install event

```javascript=
var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/main.css',
  '/script/main.js'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});
```


#### event.waitUntil(Promise)

![](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers/sw-events.png)

life cycle 相關的 event (install, activate)
可使用 event.waitUntil 來延展該 event 的週期，傳入一個 Promise，Promise resolve 該生命週期視為成功，才進入下個生命週期
```javascript
event.waitUntil(<Promise>)
```


#### Cache

* [CacheStorage](https://developer.mozilla.org/en-US/docs/Web/API/CacheStorage): Cache Object 的儲存 (Storage)，可透過 service worker 或 window 存取
    * delete()
    * has()
    * keys()
    * match()
    * open()
* [Cache Object](https://developer.mozilla.org/en-US/docs/Web/API/Cache): 為`Request`/`Response` 配對(pair)的 cache 存儲機制。
    * add()
    * addAll()
    * delete()
    * keys()
    * match()
    * matchAll()
    * put()

#### 語意

我們在這步驟 (installing)
* Open Cache
* 將預先定義的資源列表：網站載入需要的資源，存進 cache 裡面
* 如同前面提到的：成功便完成 (installed)，任何一個檔案讀取失敗的則 sw 不會 activate，且會在下次瀏覽頁面時嘗試重新 install。

### cache and return requests

成功 install 、 activated 並接管頁面之後，sw 便可以接收`fetch` event，我們可以用來回傳對應的 cache 資源

```javascript=
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
```

我們可以將新的(不在 cache storage 中) request/response 也加入 cache 中


```javascript=
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});
```

#### 語意

* 定義 `fetch` event 攔截 requests
* 如果 request/response 已存在 cache 中，回傳該 response
* 如果不存在 cache 中，發出新的 request，如果成功回傳，將 response 寫入 cache。
    * 注意：失敗的 response 也會被 cache，因此要做判斷
    * `response.type`: `basic` 代表是同個 origin 下的 request。
    * `response.clone()`: `Response` 是一種 stream 只能 consumed 一次。

### 更新 Service worker

```javascript=
self.addEventListener('activate', function(event) {

  var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
```

* 更新 SW JS file，當使用者造訪頁面，瀏覽器會在背景重新下載 sw script，並檢查是否需要更新(byte-wise compared)
* 新的 sw 會開始 **install** event
* 既有的 sw 仍掌控頁面，新的 sw 進入 **waiting** 狀態
* 當沒有任何 client 使用舊的 sw，舊的 sw 會被清除，改用新的 sw，觸發 **activate** event

前面有提過：初次 register 的頁面會執行 installing，進入 activated，但預設並不會被 service worker 控制 (onmessage, onfetch)，如果要改變此行為可以在 activate event 呼叫 `clients.claim()`

### Navigation preload (optional)

Sw bootup 會擋住 request，儘管只有一些延遲。可以 enable navigation preload，request 將會和 sw bootup 同時進行 (async)

```javascript=
addEventListener('activate', event => {
  event.waitUntil(async function() {
    // Feature-detect
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  }());
});
```

可在任何地方呼叫 `self.registration.navigationPreload.enable` (ex: btn click)，一個適合的時機是當 sw activate 時

enable 之後需要在 fetch 去接收 preload response

```javascript=
addEventListener('fetch', event => {
  event.respondWith(async function() {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) return cachedResponse;

    // Else, use the preloaded response, if it's there
    const response = await event.preloadResponse;
    if (response) return response;

    // Else try the network.
    return fetch(event.request);
  }());
});
```

### Libs

也可以使用一些寫好的 library 來使用寫好的 stategies, 整合 build tool 等等

ex: [Workbox](https://developers.google.com/web/tools/workbox/)

## Notification and Push
* https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Re-engageable_Notifications_Push
* https://developers.google.com/web/fundamentals/push-notifications?hl=en

兩個API
* Notification API
* Push API

## Notification

https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification

```javascript=
Notification.requestPermission().then(function (permission) {
  // If the user accepts, let's create a notification
  if (permission === "granted") {
    // eslint-disable-next-line no-new
    new Notification("See what's new!", {
      body: "Explore thousands of latest projects",
      icon: "/icons/icon_x96.png",
      // other options
    });
  }
});
```

取得使用者同意後，可以推送通知。
比較麻煩的是如果已經 denied 是無法跳出 popup 的。

Notification API 並不建議使用，因為 Notification API 是從 page script 發出，表示 page 存活才有通知，或是使用者操作發出通知，這是不合理的。

通知應該是要在背景觸發，且由 server (backend) 發出，因此需要使用等等會介紹的push api

使用 new Notification 發送通知在 Android 上會拋出錯誤：

Uncaught TypeError: Failed to construct ‘Notification’: Illegal constructor. Use ServiceWorkerRegistration.showNotification() instead

因為 Android 決定不實作 new Notification 送通知

而 safari IOS 則是不支援 Notification

Notification() 在未來也會漸漸棄用

https://caniuse.com/?search=Notification

## Push

* client side: subscribe a user to push 訂閱要推送的用戶
* server side: make API call trigger a push message to a user's device 打 web push API 推送訊息到用戶的裝置上
* service worker 接收到 push event，顯示 notification

### Client side

##### **subscribe** a user to push messaging

* 首先，向使用者取得推送訊息的permission
* 從瀏覽器取得`PushSubscription`
    * `PushSubscription` 包含了推送訊息 (push message) 所需的所有資訊，可以想成是 user device 的 ID
* 訂閱用戶取得 `PushSubscription` 後，需要將 `PushSubscription` 送往後端，後端將 subscription 儲存在 DB 以便之後推送訊息用。

![](https://developers.google.com/web/fundamentals/push-notifications/images/svgs/browser-to-server.svg)

### Send a Push message

當要推送訊息給用戶，要打 API 到 **push service**

#### Push Service

push service 負責接收、驗證 request，並傳送 push message 到對應的 browser。如果 browser 是離線狀態，message 會進入 push service 的列隊 (queue)，直到
* 裝置恢復連線，push service deliver message。
* message expires.

當 browser 接收到 message 並 decrypt payload，送出 `push` event 給 sw。

在 sw script 中處理 push event

![](https://developers.google.com/web/fundamentals/push-notifications/images/svgs/push-service-to-sw-event.svg)

我們可以告訴 push service queue 的規則：
*  time-to-live： message 有效的時間為多久，過期將會移除
*  urgency： 當裝置電量低的時候，低順位的 message 可能不會交付
*  topic： 給 message 一個 topic，可以置換掉其他還在 queue 中的 message

每個 browser 可以使用各自的 push service，但是都要實作同樣的 API 規範。

我們可以從 `PushSubscription` (這個 object) 中找到 push service 的 URL

```json
{
  "endpoint": "https://random-push-service.com/some-kind-of-unique-id-1234/v2/",
  "keys": {
    "p256dh" :
"BNcRdreALRFXTkOOUHK1EtK2wtaz5Ry4YfYCA_0QTpQtUbVlUls0VJXg7A8u-Ts1XbjhazAkj7I99e8QcYP7DkM=",
    "auth"   : "tBHItJI5svbpez7KI4CCXg=="
  }
}
```

此例中：
endpoint 為`https://random-push-service.com/some-kind-of-unique-id-1234/v2/`
push service 為 `random-push-service.com`

endpoint 對每個使用者都是唯一的 (`/some-kind-of-unique-id-1234`, or `?token=unique_token` etc...)


#### Web Push API

前面提過，當要推送訊息給用戶，要打 **API** 到 **push service**
我們剛剛已經知道 push service 的位置了。

API 的部分是走 **Web Push Protocal**，是 IETF standard，其中定義了如何對 push servie 呼叫 API

Push API 讓我們可以傳送訊息給使用者，其中的內容必須經過加密，防止 push service 能看到明文


![](https://developers.google.com/web/fundamentals/push-notifications/images/svgs/server-to-push-service.svg)

## Push 實作細節

### Subscribe a user

主要是呼叫 `ServiceWorkerRegistration.pushManager` 的 `subscribe` 方法
https://developer.mozilla.org/en-US/docs/Web/API/PushManager/subscribe

ServiceWorkerRegistration 可以從以下兩種方法取得


**navigator.serviceWorker.register()**
```javascript=
navigator.serviceWorker.register('/sw.js')
  .then(function(registration) {
    if (!registration.active) return registration; // sw might not active yet
    const subscribeOptions = {
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        "Your VAPID Public key"
      )
    };

    return registration.pushManager.subscribe(subscribeOptions);
  })
```

**navigator.serviceWorker.ready**
```javascript=
navigator.serviceWorker.ready.then((registration) => {
  // subscribe user
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      "Your VAPID Public key"
    ),
  };
  return registration.pushManager.subscribe(subscribeOptions);
});
```

#### **userVisibleOnly** 選項：
開發人員可以推送訊息而不顯示通知，稱為 silent push，因為用戶不知道背景發生了甚麼事，開發人員可能會利用來做一些不好的事，例如追蹤用戶位置。

目前來說瀏覽器(Chrome)還不支持 silent push，userVisibleOnly 選項需要設為 true ，視為一個象徵性的協定，以及保有未來可能支持 silent push 的彈性

#### **applicationServerKey** 選項：

Application server keys 是一組公私鑰，public key 公開，private key 存在 server 用來驗證

Application server keys 的規範是 [VAPID key](https://datatracker.ietf.org/doc/html/draft-thomson-webpush-vapid)

**applicationServerKey** 代表 public key

流程
* 加載頁面，呼叫 `subscribe()` 並傳入 public application server key
* browser 向 push service 發送請求，push service 產生一組 endpoint 並與 public key 做關聯後回傳
* browser 將 endpoint 加入 `PushSubscription` 中

![](https://developers.google.com/web/fundamentals/push-notifications/images/svgs/application-server-key-subscribe.svg)


當要推送訊息，需要發 POST request 到 push service endpoint
需要在 **Authorization** header 帶上使用 private key 加密的 JWT，push service 則會用 endpoint 對應的 public key 解密來驗證。

詳細的 web push protocal implementaion 比較複雜，這邊先不介紹下去，可以參考 [web-push-protocal](https://developers.google.com/web/fundamentals/push-notifications/web-push-protocol?hl=en#the_payload_encryption)

![](https://developers.google.com/web/fundamentals/push-notifications/images/svgs/application-server-key-send.svg)

我們可以使用 library 來幫忙實作 web push api
https://www.npmjs.com/package/web-push

### Save push subscription

`PushSubscription` 包含 push message 所需的所有資訊，我們可以將其送往後端並存入 DB

```javascript=
registration.pushManager
  .subscribe(subscribeOptions)
  .then((pushSubscription) => {
    return fetch("/api/subscription/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pushSubscription),
    });
  });
```

### Push message from server

```javascript=
// setup
webpush.setVapidDetails(
  'mailto:web-push-book@gauntface.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// send message to every subscription
findAllSubsInDB().then((subscriptions) =>
  subscriptions.map((subscription) =>
    webpush.sendNotification(subscription, JSON.stringify({
      title: "Hello"
    }))
  )
);
```

### 處理 push event

event.data 可以拿到 push message，並進行轉換

```javascript=
self.addEventListener('push', function(event) {
  // Returns string
  event.data.text()

  // Parses data as JSON string and returns an Object
  event.data.json()

  // Returns blob of data
  event.data.blob()

  // Returns an arrayBuffer
  event.data.arrayBuffer()
});
```

使用 waitUnil 告訴 browser，直到 promise 結束 sw 才會結束 
```javascript=
self.addEventListener("push", function (event) {
  const options = {};
  const promiseChain = self.registration.showNotification(
    "Hello, World.",
    options
  );
  event.waitUntil(promiseChain);
});
```

#### options

```json
{
  "//": "Visual Options",
  "body": "<String>",
  "icon": "<URL String>",
  "image": "<URL String>",
  "badge": "<URL String>",
  "vibrate": "<Array of Integers>",
  "sound": "<URL String>",
  "dir": "<String of 'auto' | 'ltr' | 'rtl'>",

  "//": "Behavioral Options",
  "tag": "<String>",
  "data": "<Anything>",
  "requireInteraction": "<boolean>",
  "renotify": "<Boolean>",
  "silent": "<Boolean>",

  "//": "Both visual & behavioral options",
  "actions": "<Array of Strings>",

  "//": "Information Option. No visual affect.",
  "timestamp": "<Long>"
}
```

### 通知行為

#### notificationclick event 可以定義通知被點擊時要做甚麼事

```javascript=
self.addEventListener('notificationclick', function(event) {
  const clickedNotification = event.notification;
  clickedNotification.close();

  // Do something as the result of the notification click
  const promiseChain = doSomething();
  event.waitUntil(promiseChain);
});
```

可以是
* open window
* Focus window
* [merging notification](https://developers.google.com/web/fundamentals/push-notifications/common-notification-patterns?hl=en#merging_notifications)
    * 例如多個訊息，可以抓取現在的 notification 進行 merge

#### notificationclose event 可以定義通知被關閉、滑掉時的行為

```javascript=
self.addEventListener('notificationclose', function(event) {
  const dismissedNotification = event.notification;

  const promiseChain = notificationCloseAnalytics();
  event.waitUntil(promiseChain);
});
```

通常用來分析用戶對通知的參與

### 支援度問題

Android edge 有 bug:
https://techcommunity.microsoft.com/t5/discussions/web-push-notification-bug-edge-for-android/m-p/1774677

IOS safari 不支援 push message... 等等

## Background Sync

延遲操作，直到用戶恢復網路。
background sync 最常用在當前一個 request 失敗時向 server 重送數據。

https://www.youtube.com/watch?v=l4e_LFozK2k&ab_channel=JakeArchibald

### request a background sync

register a sync

```javascript=
navigator.serviceWorker.ready.then(function(swRegistration) {
  return swRegistration.sync.register('myFirstSync');
});
```


listen to sync
```javascript=
self.addEventListener('sync', function(event) {
  if (event.tag == 'myFirstSync') {
    event.waitUntil(doSomeStuff());
  }
});
```

如果 register sync 當下有網路，會馬上觸發 sync event，反之會等到恢復網路連線再觸發。

這邊比較麻煩的是 register sync 沒辦法傳其他 payload，如果要暫存資料可能需要 indexDB 等 API 來達成。
例如在 offline 情況下要新增一則貼文，就需要將貼文先存入 indexDB，並在 sync event 存取後發出新增文章 API。

## Periodic Background Sync

Periodic Background Sync 用於在背景定期獲取新的網站內容。

因為 Periodic Background Sync 有可能會浪費資源，因此瀏覽器對其進行了一些限制，以Chrome為例：

Web App 只能在安裝後才能使用 Periodic Background Sync，在一般網頁瀏覽不可使用。

再來是，未使用/很少使用的 Web app 將不會啟用 Periodic Background Sync ，以減少不必要的電池或網路浪費。
Chrome 使用  site-engagement 來判定 web app 的分數，根據追蹤滑動、點擊、使用時間等等因素來評分 (about://site-engagement/ 可以看到自己瀏覽器上的各網站分數)，分數大於 0 才能使用 Periodic Background Sync

以及一些安全上的考量，只有在先前使用過的網路下才能使用。

因為這邊我也沒有做範例，就簡單看一下 API 就好

首先是要先取得權限 (使用 Permission API)

```javascript=
const status = await navigator.permissions.query({
  name: 'periodic-background-sync',
});
if (status.state === 'granted') {
  // Periodic background sync can be used.
} else {
  // Periodic background sync cannot be used.
}
```

註冊 periodicSync

```javascript=
const registration = await navigator.serviceWorker.ready;
if ('periodicSync' in registration) {
  try {
    await registration.periodicSync.register('content-sync', {
      // An interval of one day.
      minInterval: 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    // Periodic background sync cannot be used.
  }
}
```

sw 監聽 periodicsync event

```javascript=
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'content-sync') {
    // See the "Think before you sync" section for
    // checks you could perform before syncing.
    event.waitUntil(syncContent());
  }
  // Other logic for different tags as needed.
});
```

(支援度不佳 https://caniuse.com/?search=periodicSync)

個人有點不太清楚實際能應用的情景，大家之後有想法也可以再提出。

## 結論

設定好 web manifest、基本 service worker cache 已經非常夠用，其他功能因為支援度和使用限制 (例如通知需要使用者同意)，目前來說是不太實用，但還是期待未來更多 PWA 的發展。


## ref
* https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers
* https://developers.google.com/web/fundamentals/primers/service-workers#the_service_worker_life_cycle

