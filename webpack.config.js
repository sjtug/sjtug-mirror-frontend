const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        "app.bundle": "./src/app.js"
        // "app.bundle.min": "./src/app.js"
    },
    output: {
        path: './dists',
        filename: '[name].js',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        }),
        new ExtractTextPlugin("[name].css")
    ],
    module: {
        preLoaders: [
            {
                test: /\.vue$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'eslint-loader',
                exclude: /node_modules/
            }
        ],
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.vue$/,
            loader: 'vue-loader'
        },
            { test: /\.woff(\d*)\??(\d*)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf\??(\d*)$/,    loader: "file-loader" },
            { test: /\.eot\??(\d*)$/,    loader: "file-loader" },
            { test: /\.svg\??(\d*)$/,    loader: "file-loader" },
            { test: /\.scss$/, loader: "style!css!sass?sourceMap"}]
    },
    vue: {
        loaders: {
            js: 'babel',
            css: ExtractTextPlugin.extract("css")
        }
    }
}

if (process.env.NODE_ENV === 'production')
    module.exports.entry["app.bundle.min"] = "./src/app.js";
