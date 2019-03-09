import { OFFLINE_URL } from "../offlineHandler";

declare global {
  // injected by serviceworker-webpack-plugin
  const serviceWorkerOption: {
    assets: string[];
  };
}

export const cacheName = "skiller_static_assets";
export const cachedFiles = [
  ...serviceWorkerOption.assets.map(
    x => new URL(x, self.location.toString()).href
  ),
  OFFLINE_URL
];
