const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// example build
module.exports = {
  mode: 'development',
  entry: './example/src/index.js',
  output: {
    path: path.resolve(__dirname, 'example/dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      // import html files as strings ready to pass in <template>
      {
        test: /\.html$/,
        exclude: /(node_modules)/,
        use: {
          loader: path.resolve(__dirname, 'index.js'), // index.js aka 'html-to-template-loader'
        },
      },
    ],
  },

  // create demo page
  plugins: [new HtmlWebpackPlugin()],
};
