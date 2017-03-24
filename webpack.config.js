var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules"),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: ['babel'],
        exclude: /node_modules/,
        include: [__dirname],
        query: {
          "presets": ["es2015-loose", "stage-0", "react"],
          "plugins": ["react-hot-loader/babel"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
       test: /\.png$/,
       loader: "url-loader?limit=100000"
     },
     {
       test: /\.jpg$/,
       loader: "file-loader"
     },
     {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
     {
       test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
       loader: 'url?limit=10000&mimetype=application/font-woff'
     },
     {
       test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
       loader: 'url?limit=10000&mimetype=application/octet-stream'
     },
     {
       test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
       loader: 'file'
     },
     {
       test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
       loader: 'url?limit=10000&mimetype=image/svg+xml'
     }
    ]
  }
};
