const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const webpack = require('webpack');
// const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const path = require('path');
const HOST = 'localhost';
const PORT = 8080;
const PROXY = `http://${HOST}:${PORT}`;
const ASSET_PATH = path.resolve('src/')
const APP_FILE_PATH = `${ASSET_PATH}/js/index.js`

module.exports = {
    entry: APP_FILE_PATH,
    output: {
        path: __dirname + '/build/',
        filename: "app.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        host: HOST,
        port: PORT,
        hot: true,
        inline: true
    },
    module: {
         loaders: [
             {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader'],
                include: [
                    `${ASSET_PATH}/js`, // Cuts build time in half
                ],
            },
            {
                test: /\.css/,
                loaders: ['style-loader', 'css-loader'],
            }
        ]
     },
     plugins: [
         new HtmlWebpackPlugin({
             template: './src/index.html',
             inlineSource: '.(js|css)$',
             minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};