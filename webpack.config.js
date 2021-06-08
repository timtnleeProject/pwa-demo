const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const path = require("path");
const sourceDir = path.resolve(__dirname, "./src");
const distDir = path.resolve(__dirname, "./dist");

module.exports = {
  context: sourceDir,
  entry: "./index.js",
  output: {
    filename: "main.[hash].js",
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
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "./public"),
          to: distDir,
          filter: (resourcePath) => {
            return !resourcePath.match(/sw.js/);
          },
        },
        // Update sw cache name version on build
        {
          from: path.resolve(__dirname, "./public/sw.js"),
          to: path.resolve(distDir, "./sw.js"),
          transform(content) {
            const string = content.toString();
            return string.replace(/#{version}/, new Date().getTime());
          },
        },
      ],
    }),
    new WebpackAssetsManifest({
      // Options go here
    }),
  ],
  devServer: {
    open: true,
    contentBase: distDir,
    compress: true,
    port: 9000,
    historyApiFallback: {
      index: "index.html",
    },
    proxy: {
      "/api": {
        target: "https://pwa-demo-pi.vercel.app",
        secure: false,
        changeOrigin: true,
      },
    },
  },
};
