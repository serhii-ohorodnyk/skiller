import path from "path";
import webpack from "webpack";
import mergeWebpack from "webpack-merge";

import common from "./common";
import { BUILD_PATH, ROOT_PATH, SW_FILENAME } from "./const";

const isProduction =
  !!process.env.NODE_ENV && process.env.NODE_ENV !== "development";

/**
 * We have to have separate webpack configuration for service-worker because of WorkboxPlugin.InjectManifest,
 * it is not mature enough yet to be able to run source sw file through webpack bundle process.
 */
const swConfig: webpack.Configuration = {
  devtool: isProduction ? false : "inline-source-map",
  entry: [path.join(ROOT_PATH, "./src/sw")],
  name: "sw",
  output: {
    // chunkFilename: "js/[name].[hash:8].chunk.js",
    filename: SW_FILENAME,
    path: BUILD_PATH,
    publicPath: "/"
  },

  // Set-up some common mocks/polyfills for features available in node, so
  // the browser doesn't balk when it sees this stuff
  node: {
    console: true,
    fs: "empty",
    net: "empty",
    tls: "empty"
  },

  // The browser bundle will be responsible for building the resulting
  // CSS file ensure compilation is dumped into a single chunk
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          chunks: "all",
          enforce: true,
          name: "main",
          test: new RegExp(`\\.(css)$`)
        }
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      __IS_SSR__: false
    })
  ]
};

export default mergeWebpack(common(isProduction), swConfig);
