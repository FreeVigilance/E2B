const { inDev } = require('./webpack.helpers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
    {
        // Typescript loader
        test: /\.[tj]sx?$/,
        exclude: /(node_modules|\.webpack)/,
        use: {
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
            },
        },
    },
    {
        // CSS Loader
        test: /\.css$/,
        use: [
            { loader: inDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
        ],
    },
    {
        // SCSS (SASS) Loader
        test: /\.s[ac]ss$/i,
        use: [
            { loader: inDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'sass-loader' },
        ],
    },
    {
        // Less loader
        test: /\.less$/,
        use: [
            { loader: inDev() ? 'style-loader' : MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'less-loader' },
        ],
    },
    {
        // Assets loader
        // More information here https://webpack.js.org/guides/asset-modules/
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|eot|ttf|woff|woff2)$/i,
        type: 'asset',
        generator: {
            filename: 'assets/[hash][ext][query]',
        },
    },
    {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    },
    // {
    //     test: /\.svg$/,
    //     use: [
    //         {
    //             loader: '@svgr/webpack',
    //             options: {
    //                 svgoConfig: {
    //                     plugins: [
    //                         {
    //                             name: 'preset-default',
    //                             params: {
    //                                 overrides: {
    //                                     removeViewBox: false,
    //                                 },
    //                             },
    //                         },
    //                     ],
    //                 },
    //             },
    //         },
    //     ],
    // },
];
