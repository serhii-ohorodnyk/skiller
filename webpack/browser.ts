// branched version from workbox, see https://github.com/GoogleChrome/workbox/pull/1765
import WorkboxPlugin from "@httptoolkit/workbox-webpack-plugin";
import LoadablePlugin from "@loadable/webpack-plugin";
import CleanWebpackPlugin from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ExtractCssChunks from "extract-css-chunks-webpack-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
// import Analyzer from 'webpack-bundle-analyzer'
import mergeWebpack from "webpack-merge";

import common from "./common";
import {
  BUILD_PATH,
  LOADABLE_STATS_FILENAME,
  ROOT_PATH,
  SW_FILENAME
} from "./const";
import devServer from "./devServer";

// tslint:disable:no-console

const isProduction =
  !!process.env.NODE_ENV && process.env.NODE_ENV !== "development";

const browserConfig: webpack.Configuration = {
  devServer,
  devtool: isProduction ? false : "inline-source-map",
  entry: {
    main: path.join(ROOT_PATH, "./src/browser"),
    sw: path.join(ROOT_PATH, "./src/sw")
  },
  name: "browser",
  output: {
    chunkFilename: "js/[name].[hash:8].chunk.js",
    filename: (chunkData =>
      chunkData.chunk.name === "sw"
        ? "[name].js"
        : "js/[name].[hash:8].js") as any,
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
    minimizer: [new TerserPlugin({ parallel: true })],
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
    new CleanWebpackPlugin(BUILD_PATH, { allowExternal: true }),
    new LoadablePlugin({
      filename: LOADABLE_STATS_FILENAME,
      writeToDisk: true // used by devServer
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
    new WorkboxPlugin.InjectManifest({
      exclude: [LOADABLE_STATS_FILENAME],
      swDest: SW_FILENAME
    })
    // new Analyzer.BundleAnalyzerPlugin()
  ]
};

export default mergeWebpack(common(isProduction), browserConfig);
