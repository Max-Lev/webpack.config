var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var excludeNodeModules = path.resolve('node_modules');

console.log('webpack.common.js');

module.exports = {

  entry: {
    'main': path.resolve('src/main.js'),
    'vendor': path.resolve('src/vendor/vendor.es6')
  },
  output: {
    path: path.resolve('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    // resolve file extensions
    extensions: ['.jsx', '.es6', '.js', '.html', '.ts', '.css', '.scss', '.less']
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
        exclude: excludeNodeModules,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.less$/,
        exclude: excludeNodeModules,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: 'css-loader!less-loader?sourcemap'
        })
      },
      {
        test: /\.scss$/,
        exclude: excludeNodeModules,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!sass-loader?sourcemap'
        })
      },
      {
        test: /\.ts$/,
        exclude: excludeNodeModules,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
      {
        test: /\.es6$/,
        exclude: excludeNodeModules,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.js$/,
        exclude: excludeNodeModules,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },

    ]
  },
  plugins: [
    //ENABLES TO USE HTML TEMPLATE TO GENERATE DIST FILES
    // INJECTS REQUIRED LINKS TO DEV SERVER
    new HtmlWebpackPlugin({
      template: path.resolve('src/index.html')
    }),
    ///EXTRACTS FILE FROM BUNDLE TO SEPERATE FILE INSIDE DIST FOLDER
    new ExtractTextPlugin('styles.css'),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor']
    }),

  ],
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }

}
