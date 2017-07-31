const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config')('development');
const app = new (require('express'))();
// var Express = require('express');
// var app = new Express();
console.log('config ', config);
const compiler = webpack(config);
const port = 3000;

app.use(webpackDevMiddleware(
  compiler,
  {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
app.use(webpackHotMiddleware(compiler));

app.get(/.*/, (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});
