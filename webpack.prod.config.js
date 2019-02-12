const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  mode: 'production',

  optimization: {
    minimizer:[
        new UglifyJsPlugin(),
        new OptimizeCSSAssetsPlugin()
    ]
  },

  module: {
    rules: [
      /* for SASS*/
    {
      test: /\.(sass|scss)$/,
      exclude: /(node_modules)/,
      use: [

             MiniCssExtractPlugin.loader,

          {
            loader: 'css-loader',
              options:{
                sourceMap: true,

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
    new MiniCssExtractPlugin()
  ]



});
