var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      //https://github.com/gowravshekar/bootstrap-webpack
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.scss$/, loader: "style-loader!css!sass" },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      /*
      { test: /bower_components\/.+\.(jsx|js)$/,
        loader: 'imports?jQuery=jquery,$=jquery,this=>window'
      }
      */
    ]
  },
  /*
  plugins : [
    new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery"
      })
  ]
  */
};
