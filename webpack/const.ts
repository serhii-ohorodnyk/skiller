import path from "path";

// ! For the time being, should be manually synced with <root>/lambda/ssr.ts !
export const SSR_FILENAME = "ssr.js";
export const LOADABLE_STATS_FILENAME = "loadable-stats.json";
export const SW_FILENAME = "sw.js";
export const BUILD_FOLDER = "dist";

export const ROOT_PATH = path.resolve(__dirname, "../");
export const BUILD_PATH = path.join(ROOT_PATH, BUILD_FOLDER);

export const BROWSER_SRC_PATH = path.join(ROOT_PATH, "./src/browser");
export const SSR_SRC_PATH = path.join(ROOT_PATH, "./src/ssr");
export const SW_SRC_PATH = path.join(ROOT_PATH, "./src/sw");
