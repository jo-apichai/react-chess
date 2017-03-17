let path = require('path')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'public', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.js(x)?$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}
