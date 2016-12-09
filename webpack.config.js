var webpack = require("webpack");

var isProductionBuild = process.env.NODE_ENV === "production";

var config = {
    context: __dirname + "/src",
    entry: "entry.js",
    output: {
        path: __dirname + "/build",
        filename: isProductionBuild ? "void.min.js" : "void.dev.js",
        library: "Void",
        libraryTarget: "umd"
    },
    resolve: {
        root: __dirname + "/src",
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: [ "es2015", "stage-0" ]
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: '"' + process.env.NODE_ENV + '"'
            }
        })
    ]
};

if (isProductionBuild) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                passes: 2,
            }
        })
    );
} else {
    config.devtool = "#cheap-inline-source-map";
}

module.exports = config;
