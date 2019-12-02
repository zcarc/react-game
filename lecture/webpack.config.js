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
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    },// 출력

};