import {join} from 'path';
const WebpackShellPlugin = require('webpack-shell-plugin');

const include = join(__dirname, 'src');

module.exports =  {
    entry               : './src/index.js',
    output              : {
        filename        : "taco.js",
        path            : join(__dirname, 'dist'),
        libraryTarget   : 'umd',
        library         : 'taco'
    },
    devtool             : 'source-map',
    module              : {
        rules         : [
            {
                test : /\.js$/,
                use : [
                    {
                        loader: 'babel-loader'
                    },
                    {
                        loader: 'eslint-loader',
                    }],
                include
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "sass-loader" // compiles Sass to CSS
                   }],
                include
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }],
                include
            },
            {
                test : /\.json$/,
                use : 'json-loader',
                include
            }
        ]
    },
    plugins : [
        new WebpackShellPlugin({
            onBuildExit: 'node webpack.after.js'
        })
    ]
};
