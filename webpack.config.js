const webpack = require('webpack');
module.exports = {
    entry: {
        "app.bundle": "./src/app.js",
        "app.bundle.min": "./src/app.js"
    },
    output: {
        path: './dists',
        filename: '[name].js',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
            { test: /\.woff(\d*)\??(\d*)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf\??(\d*)$/,    loader: "file-loader" },
            { test: /\.eot\??(\d*)$/,    loader: "file-loader" },
            { test: /\.svg\??(\d*)$/,    loader: "file-loader" },
            { test: /\.scss$/, loader: "style!css!sass?sourceMap"}]
    }
}
