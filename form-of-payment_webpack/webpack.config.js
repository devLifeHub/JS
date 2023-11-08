const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// ===================================
const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const devtool = devMode ? 'source-map' : undefined;
// ===================================
module.exports = {
   mode,
   // ===================================
   devtool,
   // ===================================
   devServer: {
      open: true,
      hot: true,
   },
   // ===================================
   entry: ["@babel/polyfill", path.resolve(__dirname, 'src', 'index.js')],
   // ===================================
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      assetModuleFilename: 'image/[hash][ext]',
   },
   // ===================================
   plugins: [
      new HtmlWebpackPlugin({
         template: path.resolve(__dirname, 'src', 'index.html'),
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
         filename: '[name].[contenthash].css',
      }),
   ],
   // ===================================
   module: {
      rules: [
         {
            test: /\.html$/i,
            loader: 'html-loader'
         },
         // ===================================
         {
            test: /\.css$/i,
            use: [
               devMode ? "style-loader" : MiniCssExtractPlugin.loader,
               "css-loader"
            ],
         },
         // ===================================
         {
            test: /\.(?:js|mjs|cjs)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: [
                     ['@babel/preset-env', { targets: "defaults" }]
                  ]
               }
            }
         },
         // ===================================
         {
            test: /\.(png|svg|jpe?g|gif)$/i,
            type: 'asset/resource',
         },
      ],
   },
   // ===================================
   optimization: {
      minimizer: [
         "...",
         new ImageMinimizerPlugin({
            minimizer: {
               implementation: ImageMinimizerPlugin.imageminMinify,
               options: {
                  plugins: [
                     ["gifsicle", { interlaced: true }],
                     ["jpegtran", { progressive: true }],
                     ["optipng", { optimizationLevel: 5 }],
                     [
                        "svgo",
                        {
                           plugins: [
                              {
                                 name: "preset-default",
                                 params: {
                                    overrides: {
                                       removeViewBox: false,
                                       addAttributesToSVGElement: {
                                          params: {
                                             attributes: [
                                                { xmlns: "http://www.w3.org/2000/svg" },
                                             ],
                                          },
                                       },
                                    },
                                 },
                              },
                           ],
                        },
                     ],
                  ],
               },
            },
         }),
      ],
   },

}