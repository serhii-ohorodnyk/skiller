import KoaWebpack from "koa-webpack";
import open from "opn";
import webpack from "webpack";

import browser from "../webpack/browser";
import ssr from "../webpack/ssr";
import app from "./utils/app";
import hotServerMiddleware from "./utils/hotServerMiddleware";

/**
 * Introducing koa just to have good development experience.
 * Rather complex way to achieve it.
 * TODO: find better way
 */

// Webpack compiler
const compiler = webpack([ssr, browser]);

// stop server on cmd+c
process.on("SIGINT", () => {
  process.exit();
});

// tslint:disable-next-line:no-console
console.log("Starting development server...");

app.listen(3000, "localhost", async () => {
  const koaWebpackMiddleware = await KoaWebpack({
    compiler: compiler as any,
    devMiddleware: {
      logLevel: "info",
      publicPath: "/",
      stats: false
    }
  });

  app.use(koaWebpackMiddleware).use(hotServerMiddleware(compiler));

  const url = "http://localhost:3000";
  const singleCompiler = (compiler as any) as webpack.Compiler;

  let browserOpened: boolean = false;

  singleCompiler.hooks.done.tap("built", () => {
    if (!browserOpened) {
      // tslint:disable-next-line:no-console
      console.info(`Running on ${url} .`);
      open(url);
      browserOpened = true;
    }
  });
});
