module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: './build/js/',
        filename: "app.js"
    },
    module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: ['babel-loader'],
         }]
     }
};