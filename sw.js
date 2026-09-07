self.addEventListener("install", function(event) {
    console.log("Rina Camera Service Worker installed");
    self.skipWaiting();
});

self.addEventListener("activate", function(event) {
    console.log("Rina Camera Service Worker activated");
    event.waitUntil(self.clients.claim());
});
