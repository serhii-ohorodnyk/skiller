import { respondOfflinePage } from "./offlineHandler";
import {
  cacheResources,
  cleanUnusedResources,
  respondFromCache
} from "./staticAssets";

self.addEventListener("install", cacheResources);
self.addEventListener("activate", cleanUnusedResources);
self.addEventListener("fetch", respondFromCache({
  ignoreUrlParametersMatching: [/^utm_/]
}) as any); // TODO: check why type is not inferred correctly
self.addEventListener("fetch", respondOfflinePage as any);

// registerOfflineHandler(OFFLINE_URL);
