var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var path = require('path');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var amz = 'https://s3.amazonaws.com/z-live-base/platform/public/search/';

console.log('webpack-prod-config');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',
  entry: {
    'main': path.resolve('src/main.js')
  },
  output: {
    path: path.resolve('dist'),
    //publicPath: 'http://localhost:8080/dist',
    publicPath: '', //!!! prod important !!!
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    // resolve file extensions
    extensions: ['.jsx', '.es6', '.js', '.html', '.ts', '.css', '.scss', '.less']
  },
  module: {
    rules: [

    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false // workaround for ng2
      }
    }),
    new UglifyJSPlugin({
      exclude: 'node_modules',
      include: /\.min\.js\.es6$/,
      minimize: false,
      compress: false,
      sourceMap: false,
      //mangle: false
      mangle: {
        // Skip mangling these
        // except: ['$super', '$', 'exports', 'require']
      }
    })
  ]
});
