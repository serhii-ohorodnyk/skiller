import Koa from "koa";
import path from "path";
import requireFromString from "require-from-string";
import webpack from "webpack";

import handler from "../../src/ssr/handler";
import { LOADABLE_STATS_FILENAME } from "../../webpack/const";

type SsrRenderer = ReturnType<typeof handler>;

export type KoaHandler = (
  error: any,
  serverRenderer: SsrRenderer
) => Koa.Middleware;

const createKoaHandler: KoaHandler = (error, serverRenderer) => (ctx, next) => {
  if (error) {
    ctx.throw(error);
  }
  return serverRenderer(ctx.req, ctx.res);
};

function isMultiCompiler(compiler?: webpack.MultiCompiler) {
  // Duck typing as `instanceof MultiCompiler` fails when npm decides to
  // install multiple instances of webpack.
  return compiler && compiler.compilers;
}

function findCompiler(multiCompiler: webpack.MultiCompiler, name: string) {
  return multiCompiler.compilers.filter(
    compiler => (compiler as any).name.indexOf(name) === 0
  );
}

function findStats(multiStats: any, name: string) {
  return multiStats.stats.filter(
    (stats: any) => stats.compilation.name.indexOf(name) === 0
  );
}

function getFilename(serverStats: webpack.Stats, outputPath: string) {
  const assetsByChunkName = serverStats.toJson().assetsByChunkName;
  const filename = assetsByChunkName.main || "";
  // If source maps are generated `assetsByChunkName.main`
  // will be an array of filenames.
  return path.join(
    outputPath,
    Array.isArray(filename)
      ? filename.find(asset => /\.js$/.test(asset))
      : filename
  );
}

function getServerRenderer(
  filename: string,
  buffer: Buffer,
  browserStats: webpack.Stats
) {
  // tslint:disable-next-line:max-line-length
  const errMessage = `The "ssr" compiler must export a koa middleware of a tyoe \`(ctx: Koa.Context, next: () => Promise<any>) => void\``;

  const serverRenderer: typeof handler = requireFromString(
    buffer.toString(),
    filename
  ).default;
  if (typeof serverRenderer !== "function") {
    throw new Error(errMessage);
  }

  return serverRenderer(browserStats);
}

/**
 * Passes the request to the most up to date "ssr" bundle.
 * NOTE: This must be mounted after webpackDevMiddleware to ensure this
 * middleware doesn't get called until the compilation is complete.
 */
function webpackHotServerMiddleware(multiCompiler: webpack.MultiCompiler) {
  if (!isMultiCompiler(multiCompiler)) {
    throw new Error(
      `Expected webpack compiler to contain both a "browser" and "ssr" config`
    );
  }

  const ssrCompiler = findCompiler(multiCompiler, "ssr")[0];

  const outputFs = (ssrCompiler as any).outputFileSystem;
  const outputPath = (ssrCompiler as any).outputPath;

  let serverRenderer: SsrRenderer;
  let error = false;

  const doneHandler = (multiStats: webpack.Stats) => {
    try {
      error = false;

      const ssrStats = findStats(multiStats, "ssr")[0];
      // Server compilation errors need to be propagated to the client.
      if (ssrStats.compilation.errors.length) {
        error = ssrStats.compilation.errors[0];
        return;
      }

      const filename = getFilename(ssrStats, outputPath);
      const buffer = outputFs.readFileSync(filename);
      const browserCompiler = findCompiler(multiCompiler, "browser")[0];
      const browserOutputFs = (browserCompiler as any).outputFileSystem;
      const browserOutputPath = (browserCompiler as any).outputPath;
      const stats = browserOutputFs
        .readFileSync(path.join(browserOutputPath, LOADABLE_STATS_FILENAME))
        .toString();
      serverRenderer = getServerRenderer(filename, buffer, JSON.parse(stats));
    } catch (ex) {
      error = ex;
    }
  };

  // Webpack 4
  (multiCompiler as any).hooks.done.tap(
    "WebpackHotServerMiddleware",
    doneHandler
  );

  return function createHandler() {
    return createKoaHandler(error, serverRenderer).apply(
      null,
      arguments as any
    );
  };
}

export default webpackHotServerMiddleware;
