declare global {
  declare const __IS_SSR__: boolean;

  type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

  type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };
}
