import Workbox from "workbox-sw";

declare global {
  interface Event {
    waitUntil(fn: Promise<any>): void;
  }

  declare const __IS_SSR__: boolean;
  declare const workbox: any;

  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

  type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

  interface ObjectConstructor {
    keys<T>(o: T): (keyof T)[];
  }
}
