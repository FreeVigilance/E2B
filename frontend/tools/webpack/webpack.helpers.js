const path = require('path');
const cwd = process.cwd();

function inDev () {
    return process.env.NODE_ENV === 'development';
}

function filename (ext) {
    return !inDev()
        ? `static/${ext}/[name].[contenthash:8].${ext}`
        : `static/${ext}/[name].bundle.${ext}`;
}

function createWebpackAliases (aliases) {
    const result = {};
    for (const name in aliases) {
        result[name] = path.join(cwd, aliases[name]);
    }
    return result;
}

module.exports = {
    inDev,
    filename,
    createWebpackAliases,
};
