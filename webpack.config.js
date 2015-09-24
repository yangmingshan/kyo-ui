var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  cache: true,
  entry: {
    index: './ui/index.coffee'
  },
  output:{
    path: path.join(__dirname, 'dist'),
    filename: "kyo-ui.js",
    libraryTarget: 'umd',
    library: 'kui'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.hbs$/, loader: 'handlebars-loader'},
      { test: /\.coffee$/, loader: 'coffee-loader'},
      { test: /\.(gif|png)$/, loader: 'file-loader?name=images/[hash].[ext]'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.coffee']
  },
  externals: {
  'jquery': 'jQuery',
  'kyo': 'kyo'
  },
  plugins: [
    new ExtractTextPlugin("kyo-ui.css")
  ]
};
