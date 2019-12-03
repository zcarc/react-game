const path = require('path');

module.exports = {
    name: 'wordrelay-setting', // 의미는 없지만 웹팩을 왜 설정하는지에 대한 이름
    mode: 'development', // 실서비스: production
    devtool: 'eval', // 빠르게 하겠다 라는 의미

    // entry의 app에서 확장자를 적지 않으면 아래 설정으로 해당 확장자의 파일을 찾아준다.
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],
    },// 입력

    // test: /.jsx?/, 이 부분은 js와 jsx 파일에 대해 룰을 적용하겠다 라는 의미
    // loader: 'bable-loader' 바벨 로더라는 룰을 적용 하겠다 라는 의미
    module: {
        rules: [{
            test: /.jsx?/,
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
            }
        }]
    },

    // __dirname 은 노드에서 기본적으로 제공해주고 해당 파일의 폴더 경로를 반환해준다.
    // path.join()은 전달된 인자끼리 합치고 path 경로를 만들어서 반환해준다.
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },// 출력

};