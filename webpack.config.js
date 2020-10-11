var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = {
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    'to-string-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            import: true,
                            esModule: false,
                            url: true,
                            sourceMap: false
                        }
                    },
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
              test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
              loader: 'url-loader',
              options: {
                limit: 8192,
              },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
        new HtmlWebpackPlugin({
            template: 'tests/index.html'
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    entry: './tests/index.tsx',
}

const devConfig = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        open: true,
        overlay: true,
        port: 9000
    },
    mode: 'development',
    devtool: 'inline-source-map',
    ...commonConfig
}

const prodConfig = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        open: true,
        overlay: true,
        port: 9000
    },
    mode: 'production',
    devtool: false,
    optimization: {
        minimizer: [
            new TerserPlugin({
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
                sourceMap: true,
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                    mangle: false
                }
            }),
        ],
    },
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    ...commonConfig
}

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        return devConfig;
    } else {
        return prodConfig;
    }
};