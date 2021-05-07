const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [{
      test: /\.html$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: './',
            publicPath: './',
            useRelativePaths: true
          }
        }
      ]
    },
    {
      test: /\.s?css$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: 'css/'
          },
        },
        'css-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.(png|svg|jpg|gif|ico)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
            publicPath: '../img/',
            useRelativePaths: true
          }
        }
      ]
    }]
  },
  externals: {
    'jquery': 'jQuery'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    }),
  ],
  optimization: {
    minimize: true
  }
};
