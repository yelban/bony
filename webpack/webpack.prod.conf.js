const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const pwd = 'www';

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = merge(baseWebpackConfig, {
    mode: 'production',
    output: {
        path: resolve(pwd)    // 指定編譯後輸出路徑，預設是 ./dist/
    },
    plugins: [
        new OptimizeCSSAssetsPlugin(),
        // 路徑相對於 __dirname 
        new CleanWebpackPlugin([pwd], {
            // 指定起始路徑，避免 outside of the project root. Skipping...
            root: path.resolve('./'),
            verbose: true,
            dry: false
        })
    ]
});

