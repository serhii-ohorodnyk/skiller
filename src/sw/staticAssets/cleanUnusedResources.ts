import { cachedFiles, cacheName } from "./const";

async function deleteOldCachedRequests() {
  const cache = await caches.open(cacheName);
  const cacheKeys = await cache.keys();
  // all items that are not part of cachedFiles should be removed
  const requestsToDelete = cacheKeys.filter(
    req => !cachedFiles.some(file => file === req.url)
  );
  await Promise.all(requestsToDelete.map(x => cache.delete(x)));
}

function cleanUnusedResources(event: Event) {
  event.waitUntil(
    deleteOldCachedRequests().then(() => (self as any).clients.claim())
  );
}

export default cleanUnusedResources;
