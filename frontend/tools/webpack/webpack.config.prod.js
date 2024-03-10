const { filename } = require('./webpack.helpers');

const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: ['./src/index.tsx'],
    module: {
        rules: require('./webpack.rules'),
    },
    output: {
        filename: filename('js'),
        chunkFilename: '[name].[chunkhash].chunk.js',
        clean: true,
    },
    plugins: [...require('./webpack.plugins'),
        new webpack.ProvidePlugin({
            process: 'process/browser'
        })
    ],
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
        alias: {
            // Custom Aliases
            ...require('./webpack.aliases'),
        },
    },
    stats: 'errors-warnings',
    optimization: {
        minimize: true,
        sideEffects: true,
        concatenateModules: true,
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 10,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                },
            },
        },
    },
};
