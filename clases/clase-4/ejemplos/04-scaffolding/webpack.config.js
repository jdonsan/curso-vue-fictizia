const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: './src/main.js',

    output: {
        filename: 'app.min.js',
        path: __dirname + '/dist'
    },

    module: {
        rules: [
            {
                test: /\.scss$/, use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new MiniCssExtractPlugin({ filename: 'app.min.css' })
    ]
}