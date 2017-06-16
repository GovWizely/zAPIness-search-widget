const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

process.env.NODE_ENV = 'production';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './lala'
  ],
  output: {
    path: path.join(__dirname, 'build/static/js'),
    filename: '[name].js?v=[chunkhash:8]',
    publicPath: '/zAPIness-search-widget/static/js',
    chunkFilename: 'app.chunk[id].js?v=[chunkhash:8]'
  },
  plugins:
  [
    //new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      }
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    }),
    new HtmlWebpackPlugin({
      filename: '../../index.html',
      template: 'public/index.html'
    })
  ],
  resolve: {
    extensions: ['.js']
  },
  resolveLoader: {
    modules: [path.join(__dirname, 'node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [__dirname],
        options: {
          babelrc: false,
          presets: [['env', {
            modules: false,
            loose: true
          }], 'react', 'stage-3']
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        use: [{
          loader: 'url-loader',
          query: {
            limit: 100000,
            name: 'assets/images/[name]-[sha512:hash:base64:7].[ext]'
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  }
};
