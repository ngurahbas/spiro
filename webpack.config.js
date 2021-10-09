const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: { 
            import: './src/tsx/index.tsx',
            dependOn: ['react', 'style'],
        },
        react: 'react',
        style: './src/css/index.css',
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        }, {
            test: /\.css?$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader',
            ],
        }, {
            test: /\.html$/,
            use: 'html-loader',
        },],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/html/index.html',
            chunks: ['index', 'react', 'style']
        })
    ],
    devServer: {
        compress: true,
        port: 8000,
    },
    watchOptions: {
        ignored: /node_modules/,
    },
}