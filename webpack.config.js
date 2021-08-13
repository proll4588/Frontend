const path = require("path");
const miniCss = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        app: "./index.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new miniCss({
            filename: "style/style.css",
        }),
        new HtmlWebpackPlugin({
            template: "index.pug",
            filename: "index.html",
            minify: false,
        }),
        new HtmlWebpackPugPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/fonts"),
                    to: path.resolve(__dirname, "dist/fonts"),
                },
                {
                    from: path.resolve(__dirname, "src/img"),
                    to: path.resolve(__dirname, "dist/img"),
                },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(s*)css$/,
                use: [
                    { loader: miniCss.loader },
                    { loader: "css-loader", options: { url: false } },
                    { loader: "sass-loader" },
                ],
            },
            {
                test: /\.pug$/,
                use: [{ loader: "pug-loader" }],
            },
        ],
    },
    devServer: {
        port: 4200,
        contentBase: path.resolve(__dirname, "dist"),
        overlay: true,
        open: true,
    },
};
