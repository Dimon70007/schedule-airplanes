const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PolyfillInjectorPlugin = require('webpack-polyfill-injector');
const { join } = require('path');
// const HtmlWebpackTemplate = require('../html-webpack-template');

const path = join(__dirname, '../dist');
module.exports = ({ publicPath }) => ({
  output: {
    // library: 'gitIssuesTest',
    path,
    filename: 'bundle.js', // '[name].bundle.js',
    publicPath,
    // sourceMapFilename: 'bundle.map', // '[name].map', by default [file].map
  },
  resolve: {
    // in app import 'components/one'; that mean 'src/components/one'
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /src\/store\/config\w*.js/,
          /\/w*.js/,
        ],
        enforce: 'pre',
        use: 'eslint-loader',
      },
      {
        test: /\.(gif|ico|svg|png)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              limit: 10000,
              outputPath: 'imgs/',
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'file-loader?name=[name].[ext]&limit=10000&mimetype=application/font-woff&outputPath=fonts/',
        ],
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          'file-loader?name=[name].[ext]&outputPath=fonts/',
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new PolyfillInjectorPlugin({
      polyfills: [
        'WebAnimations',
      ],
      service: true,
    }),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      // Required
      title: 'My Title',
      inject: 'body',
      // minify: {
      //   collapsWhitespace: true,
      //   preserveLineBreaks: true,
      //   removeComments: true,
      //   includeAutoGeneratedTags: false,
      // },
      hash: true,
      template: './src/index.ejs',
      // template: HtmlWebpackTemplate,
      // template: 'node_modules/html-webpack-template/index.ejs',
      //
      // Optional
      // appMountId: 'root',
      // baseHref: publicPath,
      // googleAnalytics: {
      //   trackingId: 'UA-XXXX-XX',
      //   pageViewOnLoad: true,
      // },
      // meta: [
      //   {
      //     name: 'description',
      //     content: 'A better default template for html-webpack-plugin.',
      //   },
      // ],
      // // mobile: true,
      // links: [
        // 'https://fonts.googleapis.com/css?family=Roboto',
        // {
        //   href: '/apple-touch-icon.png',
        //   rel: 'apple-touch-icon',
        //   sizes: '180x180',
        // },
      //   {
      //     href: './favicon.ico',
      //     rel: 'icon',
      //     sizes: '32x32',
      //     type: 'image/ico',
      //   },
      // ],
      // inlineManifestWebpackName: 'webpackManifest',
      // scripts: [
        // 'http://example.com/somescript.js',
        // {
        //   src: '/myModule.js',
        //   type: 'module',
        // },
      //   {
      //     type: 'text/javascript',
      //     src: './spaForGithub.js',
      //   },
      // ],
      // title: 'My App',
      // window: {
      //   env: {
      //     apiHost: 'http://myapi.com/api/v1',
      //   },
      // },

      // And any other config options from html-webpack-plugin:
      // https://github.com/ampedandwired/html-webpack-plugin#configuration
    }),
  ],
});
