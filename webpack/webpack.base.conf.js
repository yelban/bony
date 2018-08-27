const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
// const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    context: path.resolve(__dirname, '../'),    // 基礎目錄，絕對路徑，用於從配置中解析入口起點(entry point)和 loader
    entry: {
        app: './src/js/app.js',
        vendors: ['vue', 'framework7', 'framework7-vue']
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'framework7': path.resolve(__dirname, '../src/framework7/packages/core/framework7.esm.bundle.js'),
            'framework7-vue': path.resolve(__dirname, '../src/framework7/packages/vue/framework7-vue.esm.bundle.js'),
        },
        extensions: ['.js', '.vue', '.json']
    },
    output: {
        filename: 'js/[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    'modules': false,
                                    'targets': {
                                        'browsers': ['> 0.25%', 'last 2 versions', 'not ie <= 8']
                                    }
                                }
                            ],
                            // 'stage-2'
                        ],
                        // 'plugins': ['transform-runtime']
                    }
                }
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'   // css 內嵌圖檔連結路徑
                        }
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 250,  //it's important
                            outputPath: 'assets/img',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/vnd.ms-fontobject',
                        name: 'assets/fonts/[name].[ext]',
                        // outputPath: '../' + pwd,
                        // publicPath: '../'
                    }
                }]
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: 'assets/fonts/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/font-woff',
                        name: 'assets/fonts/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/octet-stream',
                        name: 'assets/fonts/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype: 'application/image/svg+xml',
                        name: 'assets/fonts/[name].[ext]'
                    }
                }]
            },
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     // options: vueLoaderConfig
            // }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/style.css',
            // chunkFilename: '[id].css'
        }),
        new Webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            // filename: path.resolve(__dirname, '../src/index.html'),
            template: path.resolve(__dirname, '../src/index.html'),
            inject: true,
            // template: './src/index.html',   // 路徑相對於 context
            // template: path.resolve(__dirname, '../src/index.html'),
            minify: {
                removeComments: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                collapseWhitespace: true,
                html5: true
            }
        }),
        new CopyWebpackPlugin([
            {
                from: './src/vendors',
                to: './vendors/',
                force: true
            }
            // {
            //     from: "./src/pages",
            //     to: "./pages/",
            //     // from: './src/assets/',
            //     // // 路徑相對於 output.path
            //     // // to: './',
            //     force: true
            // },
            // {
            //     from: './src/assets/icon/favicon.ico',
            //     to: './',
            //     force: true
            // }
        ])
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /vendors/,
                    name: 'vendors',
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,      //防止重複保存頻繁重新編譯,300ms內重複保存不打包
        poll: 1000                  //每秒詢問的文件變更的次數
    }
};

