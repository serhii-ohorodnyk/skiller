import { RequestHandler } from "express-serve-static-core";
import path from "path";
import { Configuration } from "webpack";

import { BUILD_PATH, LOADABLE_STATS_FILENAME, SSR_FILENAME } from "./const";

const ssrHandler: RequestHandler = (req, res) => {
  const ssrFile = path.join(BUILD_PATH, SSR_FILENAME);
  const statsFile = path.join(BUILD_PATH, LOADABLE_STATS_FILENAME);
  const ssrModule = require(ssrFile);
  const stats = require(statsFile);
  const handler = ssrModule.default(stats);
  handler(req, res);

  // cleanup cache, otherwise we will get stale data
  delete require.cache[ssrFile];
  delete require.cache[statsFile];
};

const devServer: Configuration["devServer"] = {
  // all not matched request handle like server side render
  after: app => app.use(ssrHandler),
  compress: true,
  // contentBase: BUILD_PATH,
  historyApiFallback: true,
  hot: true,
  index: undefined,
  open: true,
  port: 3000
};

export default devServer;
