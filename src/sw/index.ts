import { registerOfflineHandler } from "./offlineHandler";

const OFFLINE_URL = "/";

workbox.precaching.suppressWarnings(true);
workbox.precaching.precacheAndRoute(
  self.__precacheManifest.concat([
    {
      revision: new Date().toISOString(),
      url: OFFLINE_URL
    }
  ]),
  {}
);

registerOfflineHandler(OFFLINE_URL);
