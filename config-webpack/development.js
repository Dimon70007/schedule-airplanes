const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./common');

const lessDev = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
      importLoaders: 1,
    },
  },
  {
    loader: 'less-loader',
    options: {
      sourceMap: true,
      sourceComments: true,
    },
  },
];

const cssConfig = [
  'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: true,
      sourceMap: true,
      localIdentName: '[name]__[local]__[hash:base64:5]',
    },
  },
];

const lessConfig = lessDev;
const publicPath = '/static/'; // join(__dirname, '../dist');

module.exports = Merge(CommonConfig({ publicPath }), {
  devtool: 'inline-source-map',
  // devServer: {
  //   hot: true,
  //   contentBase: path,
  //   publicPath,
  // },
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    // bundle the client for hot reloading
    'react-hot-loader/patch',
    // activate HMR for React
    './src/index.js',
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
              ['env', { modules: false }],
                'stage-0',
                'react',
              ],
              plugins: [
                'transform-runtime',
                'react-hot-loader/babel',
              ],
            },
          },
          // { loader: 'react-hot-loader/webpack' },
        ],
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
                speed: 9,
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PUBLIC_URL: publicPath,
      },
    }),
  ],
});
