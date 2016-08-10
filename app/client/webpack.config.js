module.exports = {
    entry: {
        basic: './config/basic.js',
        timeLine: './config/timeLine.js',
        image: './config/image.js'
    },
    output: {
        path: __dirname + '/bundle',
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.js|jsx$/, loaders: ['jsx-loader']}
        ]
    }
};