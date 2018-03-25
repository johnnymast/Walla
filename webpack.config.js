const path = require('path')
const webpack = require('webpack') // to access built-in plugins
// var ChunkManifestPlugin = require("chunk-manifest-webpack-plugin");
// var WebpackChunkHash = require("webpack-chunk-hash");
const PROD = (process.env.NODE_ENV == 'production')

let plugins = []

if (PROD) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  )
} else {
  plugins.push(
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: ['vendor.js']
    })
  )
}

const config = {
  entry: {
    build: path.resolve(__dirname, './src/main.js'),
    vendor: ['underscore', 'pixi', 'pixi-sound', 'require','matter-js']

  },
  output: {
    path: path.resolve(__dirname, 'output'),
    publicPath: 'output/',
    // filename: "[name].[chunkhash].js",
    // chunkFilename: "[name].[chunkhash].js"
    filename: '[name].js'
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash].[ext]',
              context: './src/images',
              outputPath: 'images/',
              publicPath: '../images/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  },

  resolve: {
    alias: {
      //      'require': path.resolve(__dirname, './lib/requirejs/require'),
      'require': path.resolve(__dirname, './node_modules/require.js'),
      'pixi': path.resolve(__dirname, './node_modules/pixi.js'),
      'pixi-sound': path.resolve(__dirname, './node_modules/pixi-sound'),
      'underscore': path.resolve(__dirname, './node_modules/underscore/underscore.js'),
      'matter-js': path.resolve(__dirname, './node_modules/matter-js'),
      //   'Howler': path.resolve(__dirname, './lib/howler.js/howler'),
      //   'Cookies': path.resolve(__dirname, './lib/js-cookie/src/js.cookie'),
      'core': path.resolve(__dirname, 'src/core'),
      'screens': path.resolve(__dirname, 'screens')
      //   'toolbar': path.resolve(__dirname, 'toolbar'),
      //   'game': path.resolve(__dirname, 'game'),
      //   'root': path.resolve(__dirname, './')
    },
    modules: [
      path.join(__dirname, 'src'),
      'node_modules'
    ]

  }
}

module.exports = config
