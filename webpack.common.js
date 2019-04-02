const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const workbox = require('workbox-webpack-plugin')

module.exports = {
  entry: {
    app: './src/client/index.tsx'
  },
  module: {
    rules: [
      {
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig-webpack.json'
        },
        test: /\.tsx?$/
      },
      {
        test: /\.worker\.ts$/,
        use: {
          loader: 'worker-loader'
        }
      },
      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 8192 }
          }
        ]
      }
    ]
  },
  output: {
    chunkFilename: '[name].[hash].js',
    filename: '[name].[hash].js',
    globalObject: 'this',
    path: path.join(__dirname, './dist/public/')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/client/index.html'
    }),
    new CopyWebpackPlugin([
      { from: './src/client/manifest.json' },
      { from: './_assets' }
    ]),
    new workbox.InjectManifest({
      include: [/\.(html|css|png|svg|js)$/],
      swDest: 'service-worker.js',
      swSrc: './src/client/service-worker.js'
    })
  ],
  resolve: {
    alias: {
      client: path.resolve(__dirname, 'src/client'),
      common: path.resolve(__dirname, 'src/common'),
      ['web-workers']: path.resolve(__dirname, 'src/client/web-workers')
    },
    extensions: ['.ts', '.tsx', '.js', '.json']
  }
}
