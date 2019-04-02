const path = require('path')
const { DefinePlugin, HotModuleReplacementPlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const merge = require('webpack-merge')
const common = require('./webpack.common')

const DEVELOPMENT_HOST = process.env.DEVELOPMENT_HOST ? process.env.DEVELOPMENT_HOST : 'localhost'

module.exports = merge(common, {
  devServer: {
    contentBase: path.join(__dirname, './_assets'),
    historyApiFallback: {
      rewrites: [
        { from: /^\//, to: '/index.html' }
      ]
    },
    host: '0.0.0.0',
    hot: true,
    port: 3000,
    public: DEVELOPMENT_HOST,
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  entry: {
    reactHotLoader: 'react-hot-loader/patch'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new DefinePlugin({
      SERVICE_URL_BASE: `'http://${DEVELOPMENT_HOST}:5100/'`
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8880,
      openAnalyzer: false,
      reportFilename:  path.join(__dirname, 'reports/analysis/bundle_report.html')
    })
  ]
})
