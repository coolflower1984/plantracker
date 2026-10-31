/* 计划追踪 · iOS 版 Service Worker
   只接管 ios.html 与图标资源，其余请求完全不拦截，避免影响同域其他页面。 */
var CACHE = "plan-tracker-ios-v11";
var CORE = [
  "./ios.html",
  "./icon-180.png",
  "./icon-192.png",
  "./icon-512.png",
  "./manifest.webmanifest"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (c) {
      /* 单个失败不影响安装 */
      return Promise.all(CORE.map(function (u) {
        return c.add(new Request(u, { cache: "reload" })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;
  var u;
  try { u = new URL(req.url); } catch (err) { return; }
  if (u.origin !== location.origin) return;

  var hit = /\/ios\.html$/.test(u.pathname) ||
            /\/icon-\d+\.png$/.test(u.pathname) ||
            /\/manifest\.webmanifest$/.test(u.pathname);
  if (!hit) return;

  var isDoc = req.mode === "navigate" || /\/ios\.html$/.test(u.pathname);

  e.respondWith(
    fetch(req).then(function (resp) {
      if (resp && resp.status === 200) {
        var copy = resp.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return resp;
      }
      /* 链接过期 / 服务端异常时，尽量用缓存顶住 */
      if (resp && (resp.status === 403 || resp.status >= 500)) {
        return caches.match(req, { ignoreSearch: true }).then(function (r) {
          return r || resp;
        });
      }
      return resp;
    }).catch(function () {
      return caches.match(req, { ignoreSearch: true }).then(function (r) {
        if (r) return r;
        return caches.match("./ios.html", { ignoreSearch: true });
      });
    })
  );
});
