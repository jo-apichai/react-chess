let path = require('path');

module.exports = {
  entry: "./app/components/index.jsx",
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};
