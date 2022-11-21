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
    }
  },
  devServer: {
    host: "localhost",
    port: 9000,
    historyApiFallback: true,
    open: true
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "public/index.html",
    })
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
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true
            }
          }
        ]
      }
    ]
  }
}
