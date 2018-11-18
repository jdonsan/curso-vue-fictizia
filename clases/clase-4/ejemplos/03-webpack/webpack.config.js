const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('ENV', process.env.NODE_ENV)
module.exports = {
    mode: process.env.NODE_ENV || 'development',

    // entradas
    entry: {
        app: './src/app.js'
    },

    // outputs
    output: {
        filename: 'app.min.js',
        path: __dirname + '/pro'
    },

    // loaders
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            }
        ]
    },

    // plugin
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
}