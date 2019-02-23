import Workbox from "workbox-sw";

declare global {
  interface Event {
    waitUntil(fn: Promise<any>): void;
  }

  declare const __IS_SSR__: boolean;
  declare const workbox: any;
  interface Window {
    __precacheManifest: (string | { revision: string; url: string })[];
  }
}
