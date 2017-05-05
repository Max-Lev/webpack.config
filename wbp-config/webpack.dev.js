console.log('webpack.dev.js');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var path = require('path');
var devServer = require('webpack-dev-server');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: path.resolve('dist'),
    // publicPath: 'http://localhost:8080/',
    publicPath: '',
   filename: '[name].js',
   chunkFilename: '[id].chunk.js'
  },

 // plugins: [],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});
