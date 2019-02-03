import LoadablePlugin from "@loadable/webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ExtractCssChunks from "extract-css-chunks-webpack-plugin";
import path from "path";
import SWPrecacheWebpackPlugin from "sw-precache-webpack-plugin";
import webpack from "webpack";
import mergeWebpack from "webpack-merge";
import WebpackPwaManifest from "webpack-pwa-manifest";

import common from "./common";
import { BUILD_PATH, LOADABLE_STATS_FILENAME, ROOT_PATH } from "./const";

const isProduction =
  !!process.env.NODE_ENV && process.env.NODE_ENV !== "development";

const browserConfig: webpack.Configuration = {
  devtool: isProduction ? false : "inline-source-map",
  entry: [path.join(ROOT_PATH, "./src/browser")],
  name: "browser",
  output: {
    chunkFilename: "js/[name].[hash:8].chunk.js",
    filename: "js/[name].[hash:8].js",
    path: BUILD_PATH,
    publicPath: "/"
  },

  module: {
    rules: [
      // Styles
      {
        test: /\.css$/,
        use: [
          ExtractCssChunks.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              localIdentName: "[name]-[local]__[hash:base64:8]",
              sourceMap: false
            }
          }
        ]
      },
      // Images
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "media/[name].[ext]"
            }
          }
        ]
      },
      // Fonts
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              mimetype: "application/font-woff",
              name: "media/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 8192,
              name: "media/[name].[ext]"
            }
          }
        ]
      }
    ]
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
    new LoadablePlugin({
      filename: LOADABLE_STATS_FILENAME
    }),
    new ExtractCssChunks({
      filename: "css/[name].[chunkhash:8].css",
      hot: !isProduction
    }),

    new webpack.DefinePlugin({
      __IS_SSR__: false
    }),

    new CopyWebpackPlugin([
      {
        from: "src/app/public",
        to: ""
      }
    ]),
    ...(!isProduction
      ? []
      : [
          new SWPrecacheWebpackPlugin({
            cacheId: "skiller",
            dontCacheBustUrlsMatching: /\.\w{8}\./,
            filename: "sw.js",
            logger(message) {
              if (message.indexOf("Total precache size is") === 0) {
                return;
              }
              if (message.indexOf("Skipping static resource") === 0) {
                return;
              }
              // tslint:disable-next-line:no-console
              console.log(message);
            },
            navigateFallback: "/",
            navigateFallbackWhitelist: [/^(?!\/__).*/],
            staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
          }),
          new WebpackPwaManifest({
            background_color: "#FAFAFA",
            display: "standalone",
            filename: "manifest.json",
            name: "skeleton",
            orientation: "any",
            short_name: "skeleton",
            start_url: "/",
            theme_color: "#2F79B9"
          })
        ])
  ]
};

export default mergeWebpack(common(isProduction), browserConfig);
