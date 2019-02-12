const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');



module.exports = {
    entry: {
      index: ['./src/js/index.js','./src/sass/style.sass']
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: './js/[name].bandle.js',
      chunkFilename: './js/[name].bandle.js'
    },

    resolve: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'src/libs'),
        path.resolve(__dirname, 'src/fonts')
      ],

      extensions: [ '.js', '.css', '.sass', '.scss', 'woff',  'woff2', 'ttf', 'eot', 'svg']
    },

    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks:'all'
          }
        }
      }
    },

    module: {
      rules: [

        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use:
                {
                  loader: 'babel-loader',
                  options: {
                              presets: ['@babel/preset-env']
                            }
                }
        },

        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
                  loader: 'file-loader',
                  options: {
                              name: '[name].[ext]',
                              outputPath: './fonts/'
                            }
               }]
        },

        {
          test: /\.(png|gif|jpg|jpeg)$/,
          use: [{
                  loader: 'file-loader',
                  options: {
                              name: '[name].[ext]',
                              outputPath: './img/'
                            }
               }],
        }
      ]
    },

    plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',
          title: 'New Digital',
          template: './src/index.html',
          inject: true,
          sourceMap: true,
          minify: {
            removeComments: true,
            collapseWhitespace: true
          }
      })
    ]
};
