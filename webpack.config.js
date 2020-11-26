const path = require('path');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
    mode:'development',
    entry: {
        app:'./app.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'dist')
                ],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',{
                            targets: {node:'current'},
                            modules:'false'
                        }]
                    }
                }
            },{
                test: /\.hbs$/,
                use: ['handlebars-loader']
            }
        ]
    },
    devtool: 'source-map',
    mode: 'development',
    plugins: [
        new HandlebarsPlugin({
            entry: path.join(process.cwd(), "views","*.hbs"),
            output: path.join(process.cwd(), "dist", "index.html"),
            partials: [
                path.join(process.cwd(), "views","partials", "*.hbs")
            ],
        })
    ],
    mode:'none',
    "target": "node"
};


