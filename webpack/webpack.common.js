const path = require("path")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin');
const BUILD_DIR = path.resolve(__dirname, "../build")
const SRC_DIR = path.resolve(__dirname, "../src")

module.exports = {
  entry: SRC_DIR + "/index.tsx",
  output: {
    path: BUILD_DIR,
    filename: "[hash].bundle.js",
    publicPath: "/",
  },
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    https: true,
    hot: true,
    host: "0.0.0.0",
    inline: true,
    port: 443
  },
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
    }),
    new ESLintPlugin()
  ]
}
