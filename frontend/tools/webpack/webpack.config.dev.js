const { filename } = require('./webpack.helpers');

module.exports = {
    mode: 'development',
    entry: ['./src/index.tsx'],
    module: {
        rules: require('./webpack.rules'),
    },
    output: {
        filename: filename('js'),
        chunkFilename: '[name].chunk.js',
    },
    plugins: require('./webpack.plugins'),
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
        alias: require('./webpack.aliases'),
    },
    stats: 'errors-warnings',
    devtool: 'cheap-module-source-map',
    devServer: {
        open: true,
        port: 3001,
        historyApiFallback: true,
        hot: true,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        hints: false,
    },
};
