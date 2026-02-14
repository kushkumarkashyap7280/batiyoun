if (!self.define) {
  let e,
    s = {};
  const a = (a, n) => (
    (a = new URL(a + '.js', n).href),
    s[a] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script');
          ((e.src = a), (e.onload = s), document.head.appendChild(e));
        } else ((e = a), importScripts(a), s());
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (n, c) => {
    const i = e || ('document' in self ? document.currentScript.src : '') || location.href;
    if (s[i]) return;
    let t = {};
    const r = (e) => a(e, i),
      o = { module: { uri: i }, exports: t, require: r };
    s[i] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (c(...e), t));
  };
}
define(['./workbox-4c9c6f74'], function (e) {
  'use strict';
  (importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/_next/static/chunks/109-563c9c288d9de241.js', revision: '563c9c288d9de241' },
        { url: '/_next/static/chunks/18-9b4be51f7ad67fae.js', revision: '9b4be51f7ad67fae' },
        { url: '/_next/static/chunks/324-74e80bfa765070ef.js', revision: '74e80bfa765070ef' },
        { url: '/_next/static/chunks/403-005c80136c013843.js', revision: '005c80136c013843' },
        { url: '/_next/static/chunks/417-3ec4a8a972752ecd.js', revision: '3ec4a8a972752ecd' },
        { url: '/_next/static/chunks/568-c77965f6b91381cc.js', revision: 'c77965f6b91381cc' },
        { url: '/_next/static/chunks/661-f463a72af60b3b24.js', revision: 'f463a72af60b3b24' },
        { url: '/_next/static/chunks/693-e48bf7bc0367d8b7.js', revision: 'e48bf7bc0367d8b7' },
        { url: '/_next/static/chunks/747-1057cd73109f4299.js', revision: '1057cd73109f4299' },
        { url: '/_next/static/chunks/941-92224d3b626437db.js', revision: '92224d3b626437db' },
        {
          url: '/_next/static/chunks/app/(auth)/home/page-e98882dc1dcff69e.js',
          revision: 'e98882dc1dcff69e',
        },
        {
          url: '/_next/static/chunks/app/(auth)/layout-a3120b21c1d53e15.js',
          revision: 'a3120b21c1d53e15',
        },
        {
          url: '/_next/static/chunks/app/(auth)/login/page-6209dcd0859a71e8.js',
          revision: '6209dcd0859a71e8',
        },
        {
          url: '/_next/static/chunks/app/(auth)/signup/page-837c47f10d6f9079.js',
          revision: '837c47f10d6f9079',
        },
        {
          url: '/_next/static/chunks/app/(main)/chat/page-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/(main)/layout-b50c709b7b1511d3.js',
          revision: 'b50c709b7b1511d3',
        },
        {
          url: '/_next/static/chunks/app/(main)/profile/page-62357e4439e6a82c.js',
          revision: '62357e4439e6a82c',
        },
        {
          url: '/_next/static/chunks/app/(main)/settings/appearance/page-4e551c3e2452a415.js',
          revision: '4e551c3e2452a415',
        },
        {
          url: '/_next/static/chunks/app/(main)/settings/backup/page-3aa5befd014d1fbf.js',
          revision: '3aa5befd014d1fbf',
        },
        {
          url: '/_next/static/chunks/app/(main)/settings/page-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/(main)/settings/privacy/page-9de5ffe6cfd16828.js',
          revision: '9de5ffe6cfd16828',
        },
        {
          url: '/_next/static/chunks/app/(main)/settings/system/page-1645d275a588212d.js',
          revision: '1645d275a588212d',
        },
        {
          url: '/_next/static/chunks/app/_global-error/page-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-dddbad60c4bec4ef.js',
          revision: 'dddbad60c4bec4ef',
        },
        {
          url: '/_next/static/chunks/app/api/auth/check-username/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/api/auth/google/callback/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/api/auth/google/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/api/auth/login/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/api/auth/logout/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/api/auth/request-otp/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/api/auth/signup/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/api/auth/verify-me/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/api/auth/verify-otp/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/api/upload-avatar-cloudinary/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/apple-icon/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/icon/route-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/app/layout-db0ed4f830fa99e5.js',
          revision: 'db0ed4f830fa99e5',
        },
        { url: '/_next/static/chunks/app/page-ac4d26f62edb6968.js', revision: 'ac4d26f62edb6968' },
        { url: '/_next/static/chunks/c7879cf7-d85d72e950e54055.js', revision: 'd85d72e950e54055' },
        { url: '/_next/static/chunks/framework-50d6ca952eb88716.js', revision: '50d6ca952eb88716' },
        { url: '/_next/static/chunks/main-21da53df9f315256.js', revision: '21da53df9f315256' },
        { url: '/_next/static/chunks/main-app-3ba382fd39ed0fd7.js', revision: '3ba382fd39ed0fd7' },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/app-error-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/forbidden-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/global-error-a32f63f10af1bb3a.js',
          revision: 'a32f63f10af1bb3a',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/not-found-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/next/dist/client/components/builtin/unauthorized-2ce6f182bab46d39.js',
          revision: '2ce6f182bab46d39',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        { url: '/_next/static/chunks/webpack-c09d598c2ca88f00.js', revision: 'c09d598c2ca88f00' },
        { url: '/_next/static/css/8637ed9dec4fd9c6.css', revision: '8637ed9dec4fd9c6' },
        {
          url: '/_next/static/media/4cf2300e9c8272f7-s.p.woff2',
          revision: '18bae71b1e1b2bb25321090a3b563103',
        },
        {
          url: '/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/_next/static/media/8d697b304b401681-s.woff2',
          revision: 'cc728f6c0adb04da0dfcb0fc436a8ae5',
        },
        {
          url: '/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
        },
        {
          url: '/_next/static/media/9610d9e46709d722-s.woff2',
          revision: '7b7c0ef93df188a852344fc272fc096b',
        },
        {
          url: '/_next/static/media/ba015fad6dcf6784-s.woff2',
          revision: '8ea4f719af3312a055caf09f34c89a77',
        },
        {
          url: '/_next/static/zzYR5FsWIDfaog3rdwqSu/_buildManifest.js',
          revision: '9fa200cd319c3f5fbbe9459f0a09a7e7',
        },
        {
          url: '/_next/static/zzYR5FsWIDfaog3rdwqSu/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        { url: '/apple-touch-icon.svg', revision: '6eb14799ef103f93214acd47255f8831' },
        { url: '/favicon.ico', revision: '6eb14799ef103f93214acd47255f8831' },
        { url: '/favicon.svg', revision: '6eb14799ef103f93214acd47255f8831' },
        { url: '/icons/icon-128x128.png', revision: '2964de66abc7fe40b1ff9622f8be2322' },
        { url: '/icons/icon-144x144.png', revision: '23eb59893c467fdc22e1feddcfa68e12' },
        { url: '/icons/icon-152x152.png', revision: 'ee35c377934601e617fed7c7c6db0b24' },
        { url: '/icons/icon-192x192.png', revision: '997af27274decf9e6aa7a9a0ee6dc2df' },
        { url: '/icons/icon-384x384.png', revision: '4cb6a6d69fec71d37792138912016308' },
        { url: '/icons/icon-512x512.png', revision: '3c5f91669a678dd8fea5a85dc45a5864' },
        { url: '/icons/icon-72x72.png', revision: 'c6516125c14eae2080c209d1e9debc34' },
        { url: '/icons/icon-96x96.png', revision: '50e442f96bdc231d2b9284d67e0b672e' },
        { url: '/manifest.json', revision: '80eb589ddab26bebcc792bbac694eef7' },
        { url: '/screenshots/desktop-home.png', revision: 'd2ba269699df015ef4f2929e6907827a' },
        { url: '/screenshots/mobile-home.png', revision: 'c93e74bea06d3ebdbcf3e10fa0f75b43' },
        { url: '/swe-worker-5c72df51bb1f6ee0.js', revision: '76fdd3369f623a3edcf74ce2200bfdd0' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] },
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({ response: e }) =>
              e && 'opaqueredirect' === e.type
                ? new Response(e.body, { status: 200, statusText: 'OK', headers: e.headers })
                : e,
          },
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ sameOrigin: e, url: { pathname: s } }) =>
        !(!e || s.startsWith('/api/auth/callback') || !s.startsWith('/api/')),
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        '1' === e.headers.get('RSC') &&
        '1' === e.headers.get('Next-Router-Prefetch') &&
        a &&
        !s.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ request: e, url: { pathname: s }, sameOrigin: a }) =>
        '1' === e.headers.get('RSC') && a && !s.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ url: { pathname: e }, sameOrigin: s }) => s && !e.startsWith('/api/'),
      new e.NetworkFirst({
        cacheName: 'pages',
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })],
      }),
      'GET',
    ),
    e.registerRoute(
      ({ sameOrigin: e }) => !e,
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 })],
      }),
      'GET',
    ),
    (self.__WB_DISABLE_DEV_LOGS = !0));
});
