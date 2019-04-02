self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.core.clientsClaim();
workbox.core.skipWaiting();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
workbox.routing.registerNavigationRoute("./index.html");
