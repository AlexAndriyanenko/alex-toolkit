const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "eval-source-map",
  output: {
    filename: "bundle.[hash].js",
  },
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"],
    modules: ["node_modules", "src"],
    alias: {
      root: __dirname,
    },
  },
  devServer: {
    host: "localhost",
    port: 9999,
    historyApiFallback: true,
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: {
                  removeViewBox: false,
                },
              },
            },
          },
          "file-loader",
        ],
      },
    ],
  },
};
