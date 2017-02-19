const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: './build/',
        filename: "app.js"
    },
    module: {
         loaders: [
             {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ['babel-loader']
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
        new HtmlWebpackInlineSourcePlugin()
    ]
};