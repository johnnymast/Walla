const path = require('path')
const webpack = require('webpack')
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

/**
 * Prophecy plugins.
 */
plugins.push(
  new webpack.DefinePlugin({
    PLUGIN_MATTERJS: JSON.stringify(true),
    PLUGIN_DEBUG: JSON.stringify(false),
  })
)

const config = {
  entry: {
    build: path.resolve(__dirname, './src/prophecy.js'),
    vendor: ['pixi', 'pixi-sound', 'tweenjs', 'pixi-tiledmap', 'matter-js']

  },
  output: {
    path: path.resolve(__dirname, 'output'),
    publicPath: 'output/',
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
      'eventemitter': path.resolve(__dirname, './node_modules/eventemitter3/index.js'),
      'pixi': path.resolve(__dirname, './node_modules/pixi.js'),
      'pixi-sound': path.resolve(__dirname, './node_modules/pixi-sound'),
      'pixi-tiledmap': path.resolve(__dirname, './node_modules/pixi-tiledmap'),
      'matter-js': path.resolve(__dirname, './node_modules/matter-js'),
      'tweenjs': path.resolve(__dirname, './node_modules/@tweenjs/tween.js'),
      'prophecyjs': path.resolve(__dirname, './src/prophecy.js'),
      'core': path.resolve(__dirname, 'src/core'),
      'plugins': path.resolve(__dirname, 'src/plugins'),
      'gui': path.resolve(__dirname, 'src/gui'),
      'input': path.resolve(__dirname, 'src/core/input'),
      'screens': path.resolve(__dirname, 'screens'),
      'objects': path.resolve(__dirname, 'objects')
    },
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules')
    ]

  },
  target: 'web',
  node: {
    fs: 'empty'
  },
}

module.exports = config
