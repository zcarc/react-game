const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval', // production: hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: './client'
    },

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [
                    ['@babel/preset-env', {
                        targets:{
                            browsers: ['> 1% in KR']
                        }
                    }], '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties']
            }
        }]
    },

    // module의 options에 debug: true를 전부 넣어준다.
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true })
    ],

    output: {
        filename: 'app.js',
        path: path.join(__dirname, 'dist')
    }
};