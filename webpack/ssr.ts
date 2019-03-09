import path from "path";
import webpack from "webpack";
import mergeWebpack from "webpack-merge";
// import nodeModules from "webpack-node-externals"

import common from "./common";
import { BUILD_PATH, SSR_FILENAME, SSR_SRC_PATH } from "./const";

const isProduction =
  !!process.env.NODE_ENV && process.env.NODE_ENV !== "development";

const ssrConfig: webpack.Configuration = {
  devtool: isProduction ? false : "eval-source-map",
  entry: [SSR_SRC_PATH],
  // External modules that we avoid transpiling
  // externals: nodeModules(),
  name: "ssr",
  node: {
    __dirname: true
  },
  output: {
    chunkFilename: "[name].js",
    filename: SSR_FILENAME,
    libraryTarget: "commonjs2",
    path: BUILD_PATH,
    publicPath: "/"
  },
  target: "node",

  module: {
    rules: [
      // Styles
      {
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              exportOnlyLocals: true
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
              emitFile: false,
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
              emitFile: false,
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
              emitFile: false,
              limit: 8192,
              name: "media/[name].[ext]"
            }
          }
        ]
      }
    ]
  },

  // Plugins
  plugins: [
    // Only emit a single `server.js` chunk
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),

    new webpack.DefinePlugin({
      __IS_SSR__: true
    })
  ],

  resolve: {
    modules: [path.resolve(__dirname, "..", "node_modules")]
  }
};

export default mergeWebpack(common(isProduction), ssrConfig);
