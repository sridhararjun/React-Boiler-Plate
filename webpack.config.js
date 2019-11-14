const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  // entry: {
  //   app: "./src/index.js",
  //   about: "./src/js/about.js"
  // },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader", "postcss-loader"]
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "postcss-loader"]
        })
      },
      {
        test: /\.scss$/,
        // use: [
        //   { loader: "style-loader" },
        //   { loader: "css-loader" },
        //   { loader: "postcss-loader" },
        //   { loader: "sass-loader" }
        // ]
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            { loader: "css-loader", options: { sourceMap: true } },
            { loader: "postcss-loader", options: { sourceMap: true } },
            { loader: "sass-loader", options: { sourceMap: true } }
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-react"]
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin("styles.css"),
    new HtmlWebPackPlugin({
      hash: true,
      title: "Yelp-Clone",
      filename: "index.html",
      template: "./src/public/index.html"
    })
  ]
};
