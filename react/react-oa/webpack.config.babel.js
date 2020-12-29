const path = require('path');

module.exports = {
    entry: {
        bundle: './app/index.js',
        design: './app/design.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            // { test: /\.jsx?$/, loader: 'babel' },
            {
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['react', 'es2015', 'stage-1']
                }
            },
            { test: /\.(png|jpg)$/, loader: "url?limit=40000" },
            //"style-loader!css-loader?modules"
            { test: /\.css$/, loader: "style!css" },
        ]
    }
}