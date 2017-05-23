const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins:
  [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify('production')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      unused: true,
      dead_code: true,
      warnings: false
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
        query: {
          presets: [['es2015', { modules: false }], 'stage-0', 'react'],
          plugins: ['react-hot-loader/babel']
        }
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
