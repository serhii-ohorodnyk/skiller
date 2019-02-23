import Koa, { Middleware } from "koa";
import koaSend from "koa-send";
import path from "path";

import { ROOT_PATH } from "../../webpack/const";

const staticFiles = (root: string, immutable = true): Middleware => async (
  ctx,
  next
) => {
  try {
    if (
      ctx.path !== "/" &&
      ctx.path !== "/ssr.js" &&
      !ctx.path.endsWith("stats.json")
    ) {
      return await koaSend(ctx, ctx.path, {
        immutable,
        root
      });
    }
    // tslint:disable-next-line:no-empty
  } catch (e) {}
  return next();
};

const app = new Koa().use(
  staticFiles(path.resolve(ROOT_PATH, "src", "app", "public"))
);

export default app;
