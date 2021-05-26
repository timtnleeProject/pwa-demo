// const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const sourceDir = path.resolve(__dirname, "./src");
const distDir = path.resolve(__dirname, "./dist");

module.exports = {
  context: sourceDir,
  entry: "./index.js",
  output: {
    filename: "main.js",
    path: distDir,
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(sourceDir, "index.html"),
      filename: "index.html",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, "../public"),
    //       to: distDir,
    //     },
    //   ],
    // }),
  ],
  devServer: {
    open: true,
    contentBase: distDir,
    compress: true,
    port: 9000,
  },
};
