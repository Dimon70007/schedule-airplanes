const webpack = require('webpack');
const Merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CommonConfig = require('./common');

const extractCss = new ExtractTextPlugin({
  filename: 'styles.css',
  disable: false,
  allChunks: true,
});
const lessUseProd = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      importLoaders: 1,
      sourceMap: true,
      '-minimize': true,
    },
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true,
    },
  },
];
const cssConfig = extractCss.extract({
  fallback: 'style-loader',
  use: lessUseProd.slice(0, -1),
});
const lessConfig = extractCss.extract({
  fallback: 'style-loader',
  use: lessUseProd,
});
const publicPath = '/git-issues-test/dist/';

module.exports = Merge(CommonConfig({ publicPath }), {
  devtool: 'cheap-module-source-map',
  entry: [
    'babel-polyfill',
    './src/index.js',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
            ['env', { modules: false }],
              'stage-0',
              'react',
            ],
            plugins: [
              'transform-runtime',
            ],
            // comments: false,
          },
        },
      },
      {
        test: /\.(jpe?g|png)$/i,
        use: [
          'file-loader?name=[name].[ext]&limit=10000&outputPath=imgs/',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              pngquant: {
                optimizationLevel: 7,
                interlaced: false,
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: cssConfig,
      },
      {
        test: /\.less$/,
        use: lessConfig,
      },
    ],
  },
  plugins: [
    extractCss,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PUBLIC_URL: JSON.stringify(publicPath),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
  ],
});
