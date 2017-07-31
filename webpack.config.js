module.exports = (env) => {
  const path = `./config-webpack/${env}.js`;
  console.log('Webpack config:', path);
  const schema = require(path); // .default;
  console.log('schema ', schema);
  return schema;
};
