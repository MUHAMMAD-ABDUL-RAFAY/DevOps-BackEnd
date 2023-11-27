const path = require('path')
const nodeExternals = require('webpack-node-externals'); 
module.exports = {
    entry: {
        main: './server.js'
    },
    output: {
        path: path.resolve(__dirname, 'dev-build'),
        filename: '[name].cjs',
        publicPath: '/',
        clean: true,
    },
    mode: "development",
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
            {
                test: /\.node$/,
                use: ['file-loader'],
              },
        ],
    },
}