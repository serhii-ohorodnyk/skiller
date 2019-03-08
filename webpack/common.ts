import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import path from "path";
import webpack from "webpack";

import { ROOT_PATH } from "./const";
import IgnoreNotFoundExportPlugin from "./IgnoreNotFoundExportPlugin";

export default (isProduction: boolean): webpack.Configuration => ({
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: "graphql-tag/loader",
        test: /\.(graphql|gql)$/
      },
      // Typescript
      {
        exclude: /node_modules/,
        test: /\.(j|t)sx?$/i,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: [
                "@loadable/babel-plugin",
                "react-hot-loader/babel",
                "@babel/syntax-dynamic-import",
                [
                  "styled-components",
                  {
                    displayName: !isProduction,
                    ssr: true
                  }
                ]
              ],
              presets: [
                "@babel/react",
                [
                  "@babel/preset-typescript",
                  {
                    isTSX: false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      app: path.resolve(ROOT_PATH, "src/app")
    },
    extensions: [".ts", ".tsx", ".js", ".jsx", ".gql", ".graphql"],
    modules: ["node_modules"]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      tslint: true
    }),
    new IgnoreNotFoundExportPlugin()
  ]
});
