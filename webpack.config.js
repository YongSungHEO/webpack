const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                use: [  // 배열의 뒤에서부터 읽는다.
                    process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader'
                ],
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
        new webpack.BannerPlugin({
            banner: `
                Build Date: ${new Date().toLocaleDateString()}
                Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
                Author: ${childProcess.execSync('git config user.name')}
            `
        }),
        new webpack.DefinePlugin({
            'api.domain': JSON.stringify('http://dev.api.domain.com')
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            templateParameters: {
                env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
            },
            minify: process.env.NODE_ENV === 'production' ? {
                collapseWhitespace: true,   // 빈칸 제거
                removeComments: true,       // 주석 제거
            } : {}
        }),
        new CleanWebpackPlugin(),
        ...(process.env.NODE_ENV === 'production'
            ? [new MiniCssExtractPlugin({ filename: '[name].css' })]
            : []
        )
    ]
}
