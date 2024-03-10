const webpack = require('webpack');
const { inDev } = require('./webpack.helpers');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = [
    new ForkTsCheckerWebpackPlugin(),
    inDev() && new webpack.HotModuleReplacementPlugin(),
    inDev() && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'public/index.html',
        inject: true,
    }),
    new MiniCssExtractPlugin({
        filename: '[name].[chunkhash].css',
        chunkFilename: '[name].[chunkhash].chunk.css',
    }),
    // new ModuleFederationPlugin({
    //     name: 'host',
    //     filename: 'static/js/remoteEntry.js',
    //     remotes: {

    //         modelManager: `modelManager@${
    //             isDev
    //                 ? 'https://test-mm.foresight-fund.ru'
    //                 : 'https://test-mm.foresight-fund.ru'
    //         }/static/js/remoteEntry.js`,

    //         energyPie: `energy_pie@${
    //             isDev
    //                 ? 'https://test-ep.foresight-fund.ru'
    //                 : 'https://test-ep.foresight-fund.ru'
    //         }/static/js/remoteEntry.js`,

    //         headpage: `headpage@${
    //             isDev
    //                 ? 'https://test-hp-v2.foresight-fund.ru'
    //                 : 'https://test-hp-v2.foresight-fund.ru'
    //         }/static/js/remoteEntry.js`,

    //         energoRouter: `energorouter@${
    //             isDev
    //                 ? 'https://test-er.foresight-fund.ru'
    //                 : 'https://test-er.foresight-fund.ru'
    //         }/static/js/remoteEntry.js`,
    //     },
    //     shared: [
    //         {
    //             react: {
    //                 singleton: true,
    //                 requiredVersion: dependencies.react,
    //             },
    //             'react-dom': {
    //                 singleton: true,
    //                 requiredVersion: dependencies['react-dom'],
    //             },
    //         },
    //     ],
    // }),
].filter(Boolean);
