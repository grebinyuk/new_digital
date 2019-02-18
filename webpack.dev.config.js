const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.config.js');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
    rules: [

      {
        test: /\.(sass|scss)$/,
        exclude: /(node_modules)/,
        use: [
                'style-loader',

                {
                  loader: 'css-loader',
                  options: {
                              sourceMap: true
                            }
                },

                {
                  loader: 'postcss-loader',
                  options: {
                    plugins: [autoprefixer('last 2 version')],
                    sourceMap: true
                  }
                },

                {
                  loader: 'sass-loader',
                  options: {
                    sourceMap: true
                  }
                }


             ]
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});
