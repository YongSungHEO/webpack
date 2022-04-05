const path = require('path');
const MyWebpackPlugin = require('./src/myWebpackPlugin');

module.exports = {
    mode: 'development',
    entry: {
        main: './src/app.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // .js 확장자로 끝나는 모든 파일
                use: [path.resolve('./src/loadertest')],
                exclude: [/node_modules/],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],    // 배열의 뒤에서부터 읽는다.
            },
            {
                test: /\.(png|jpg|jpeg)$/,
                type: 'asset',  // Default로 크기가 8kb 미만인 파일은 inline 모듈로 처리, 그렇지 않으면 resource 모듈로 처리
                generator: {
                    filename: 'static/[name][hash][ext][query]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 5 * 1024 // 5kb
                    }
                }
            },
        ],
    },
    plugins: [
        new MyWebpackPlugin()
    ]
}
