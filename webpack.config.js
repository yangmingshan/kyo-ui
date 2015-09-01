var path = require('path');
var webpack = require('webpack');

module.exports = {
  cache: true,
  entry: {
    index: './ui/index.js'
  },
  output:{
    path: path.join(__dirname, 'dist'),
    publicPath: 'dist',
    filename: "kyo-ui.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style!css'},
      { test: /\.hbs$/, loader: 'handlebars-loader'},
      { test: /\.coffee$/, loader: 'coffee-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.coffee']
  },
  externals: {
  'jquery': 'jQuery',
  'K': 'K'
  },
};
