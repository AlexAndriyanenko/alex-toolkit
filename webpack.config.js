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
    alias: {
      root: __dirname,
      components: path.resolve(__dirname, "../src/components"),
      stories: path.resolve(__dirname, "../src/stories"),
      utils: path.resolve(__dirname, "../src/utils"),
      assets: path.resolve(__dirname, "../src/assets"),
      hooks: path.resolve(__dirname, "../src/hooks"),
      models: path.resolve(__dirname, "../src/models"),
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
