var NODE_ENV = process.env.NODE_ENV;
var path              = require("path");
var webpack           = require("webpack");

var plugins = [
    new webpack.ProvidePlugin({
        $: "jqueryFolder",
        Popper: "popperFolder"
    }),
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(NODE_ENV)
    })
];

var entryPoints = {
    './index':        ["./index.js"],
    './scripts.vendor':        ["./design/vendor/hubScripts.js"],
    // './scripts.theme':         ["./design/theme/scripts.js"],
};


if (NODE_ENV === 'development') {
    console.log('Looks like we are in development mode!');

    var liveReloadString = 'webpack-dev-server/client?http://localhost:9000';

    for (var prop in entryPoints) {
        typeof entryPoints[prop] ===  "object" ? entryPoints[prop].unshift(liveReloadString) : true;
    }
}

// if (NODE_ENV === 'production') {
//     console.log('Looks like we are in production mode!');
//
//     var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
//
//     plugins.push(
//         new UglifyJsPlugin({
//             sourceMap: true
//         })
//     );
// }


module.exports = {
    context: __dirname + '/src',
    entry: entryPoints,
    output: {
        path: __dirname + "/build",
        publicPath: '/',
        filename: "[name].js",
        library: 'vendorScripts'
    },
    module: {
        rules: [
            {
                test: require.resolve( "./src/design/theme/scripts.js" ),
                use: "imports-loader?$=jqueryFolder,define=>false"
            },

            {
                test: /\.handlebars$/,
                loader: 'handlebars-loader',
                query: {
                    partialDirs: [
                        path.join(__dirname + '/src', 'templates')
                    ]
                }
            },
            {
                test: /\.js/,
                exclude: /.\/src\/design\/vendor\//,
                loader: 'babel-loader'
            }
        ]

    },
    resolve: {
        alias: {
            jqueryFolder: path.resolve(__dirname, 'src/design/vendor/jquery/jquery.slim.js'),
            popperFolder: path.resolve(__dirname, 'src/design/vendor/popper/popper.min.js')
        }
    },
    plugins: plugins,
    devServer: {
        host: 'localhost',
        port: 9000,
        contentBase: __dirname + '/build/',
        publicPath: '/',
        watchContentBase: true,
    }
};



