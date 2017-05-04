var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var excludeNodeModules = path.resolve('node_modules');
// const extractCSS = new ExtractTextPlugin('src/styles/css/style.css');
module.exports = {

  entry: {
    'main': path.resolve('src/main.js'),
  },
  output: {
    path: path.resolve('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    // resolve file extensions
    extensions: ['.jsx', '.js', '.html', '.ts']

  },
  module: {
    rules: [

      {
        test: /\.html$/,
        exclude: excludeNodeModules,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader'
      }
    ]
  },
  plugins: [
    //ENABLES TO USE HTML TEMPLATE TO GENERATE DIST FILES
    // INJECTS REQUIRED LINKS TO DEV SERVER
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html')
    }),
    new ExtractTextPlugin('styles.css')
  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }

}
