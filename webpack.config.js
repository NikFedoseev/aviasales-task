const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    //filename: "./index.html"
});

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + "/dist",
        publicPath: "/",
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    { loader: 'file-loader',
                        options: {
                            outputPath: './images/'
                        }
                    }
                ]
            },
            {
                test: /\.ttf$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: './fonts/'
                        }
                    }
                    
                ]
            }
        ]
    },
   plugins: [htmlPlugin]
};