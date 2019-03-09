import { cachedFiles, cacheName } from "./const";

async function addNewCacheItems() {
  const cache = await caches.open(cacheName);
  const cacheKeys = await cache.keys();

  const keysToAdd = cachedFiles.filter(
    x => !cacheKeys.some(req => req.url === x)
  );
  const responsesToAdd = await Promise.all(
    keysToAdd.map(async url => {
      const response = await fetch(
        new Request(url, { credentials: "same-origin" })
      );
      return {
        response,
        url
      };
    })
  );
  // Bail out of installation unless we get back a 200 OK for
  // every request.
  const failed = responsesToAdd.find(item => !item.response.ok);
  if (!!failed) {
    throw new Error(
      `Request for " ${failed.url} returned a response with status ${
        failed.response.status
      }`
    );
  }
  await Promise.all(
    responsesToAdd.map(item => cache.put(item.url, item.response))
  );
}

function cacheResources(event: Event) {
  event.waitUntil(addNewCacheItems());
}

export default cacheResources;
