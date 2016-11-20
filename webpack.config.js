const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    entry: {
        "app.bundle": "./src/app.js"
        "app.bundle.min": "./src/app.js"
    },
    output: {
        path: './dists',
        filename: '[name].js',
        publicPath: 'dists/',
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            include: /\.min\.js$/,
            minimize: true
        })
    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
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
            loader: 'vue'
        },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            { test: /\.woff(\d*)\??(\d*)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf\??(\d*)$/,    loader: "file-loader" },
            { test: /\.eot\??(\d*)$/,    loader: "file-loader" },
            { test: /\.svg\??(\d*)$/,    loader: "file-loader" },
            { test: /\.scss$/, loader: "style!css!sass?sourceMap"}],
        postLoaders: [
            { test: /vue-icons/, loader: "callback-loader"}
        ]
    },
    vue: {
        loaders: {
            js: 'babel-loader',
            css: 'style-loader!css-loader',
        }
    },
    callbackLoader:
      require("vue-icons/icon-loader")(["fa-question-circle"])
}

if (process.env.NODE_ENV === 'production')
    module.exports.entry["app.bundle.min"] = "./src/app.js";
