const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    devtool: 'eval', // production: hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx'],
        // alias: {
        //     'react-dom': '@hot-loader/react-dom'
        // }
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
                        targets: {
                            browsers: ['> 1% in KR']
                        }
                    }], '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties', 'react-hot-loader/babel']
            }
        },
            {
                test: /\.(js|jsx)$/,
                use: 'react-hot-loader/webpack',
                include: /node_modules/
            }],

    },

    // module의 options에 debug: true를 전부 넣어준다.
    plugins: [
        new webpack.LoaderOptionsPlugin({debug: true})
    ],

    output: {
        filename: 'app.js',
        publicPath: '/dist/'

        // wepack-dev-server 를 사용할 경우 path를 직접 설정하지 않아야한다.
        // 강의에서 아마 직접 관리하는것 같다라고 한다.
        // path: path.join(__dirname, 'dist')

        // path: 실제 경로
        // publicPath: 가상 경로
    }
};