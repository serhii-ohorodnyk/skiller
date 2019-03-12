import { RequestHandler } from "express-serve-static-core";
import path from "path";
import waitOn from "wait-on";
import { Configuration } from "webpack";

import { BUILD_PATH, LOADABLE_STATS_FILENAME, SSR_FILENAME } from "./const";

const ssrFile = path.join(BUILD_PATH, SSR_FILENAME);
const statsFile = path.join(BUILD_PATH, LOADABLE_STATS_FILENAME);

const waitToCompile: (handler: RequestHandler) => RequestHandler = handler => {
  let firstCompilation = true;
  return async (...args) => {
    if (firstCompilation) {
      try {
        await waitOn({
          resources: [ssrFile, statsFile],
          timeout: 10000,
          window: 100
        });
        firstCompilation = false;
        // tslint:disable-next-line:no-empty
      } catch {}
    }
    return handler(...args);
  };
};

const ssrHandler: RequestHandler = async (req, res) => {
  try {
    const ssrModule = require(ssrFile);
    const stats = require(statsFile);
    const handler = ssrModule.default(stats);
    await handler(req, res);
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(err.toString());
  }

  // cleanup cache, otherwise we will get stale data
  delete require.cache[ssrFile];
  delete require.cache[statsFile];
};

const devServer: Configuration["devServer"] = {
  // all not matched requests handle like server side render
  after: app => app.use(ssrHandler),
  // this before hook is needed to intercept index request before devServer shows its "listing directory" page
  before: app => app.get("/", waitToCompile(ssrHandler)),
  compress: true,
  historyApiFallback: false,
  hot: true,
  open: true,
  port: 3000
};

export default devServer;
