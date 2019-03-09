import { cachedFiles, cacheName } from "./const";

function stripIgnoredUrlParameters(
  originalUrl: string,
  ignoreUrlParametersMatching: RegExp[]
) {
  const url = new URL(originalUrl);
  // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
  url.hash = "";

  url.search = url.search
    .slice(1) // Exclude initial '?'
    .split("&") // Split into an array of 'key=value' strings
    .map(kv => kv.split("=")) // Split each 'key=value' string into a [key, value] array
    .filter(kv =>
      ignoreUrlParametersMatching.every(
        ignoredRegex => !ignoredRegex.test(kv[0]) // Return true if the key doesn't match any of the regexes.
      )
    )
    .map(kv => kv.join("=")) // Join each [key, value] array into a 'key=value' string
    .join("&"); // Join the array of 'key=value' strings into a string with '&' in between each

  return url.toString();
}

async function readFromCache(request: Request, url: string) {
  try {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(url);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw Error("The cached response that was expected is missing.");
  } catch (err) {
    // Fall back to just fetch()ing the request if some unexpected error
    // prevented the cached response from being valid.
    // tslint:disable-next-line:no-console
    console.warn('Couldn\'t serve response for "%s" from cache: %O', url, err);
    return fetch(request);
  }
}

interface CacheOptions {
  ignoreUrlParametersMatching?: RegExp[];
}

function respondFromCache({ ignoreUrlParametersMatching = [] }: CacheOptions) {
  return (event: FetchEvent) => {
    if (event.request.method === "GET") {
      const requestUrl = stripIgnoredUrlParameters(
        event.request.url,
        ignoreUrlParametersMatching
      );
      const cachedUrl = cachedFiles.find(x => x === requestUrl);
      if (!!cachedUrl) {
        event.respondWith(readFromCache(event.request, requestUrl));
      }
    }
  };
}

export default respondFromCache;
