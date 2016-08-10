var path = require('path');
var fs = require('fs');
var cheerio = require('cheerio');

module.exports = {
    entry: {
        basic: './config/basic.js',
        timeLine: './config/timeLine.js',
        image: './config/image.js'
    },
    output: {
        path: path.join(__dirname, "/bundle", "[hash]"),
        filename: "[name].bundle.[hash].js",
        chunkFilename: "[id].bundle.js"
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {test: /\.js|jsx$/, loaders: ['jsx-loader']}
        ]
    },
    plugins: [
        function () {
            this.plugin("done", function (stats) {
                //write file
                // fs.writeFileSync(path.join(__dirname, "stats.json"), JSON.stringify(stats.toJson()));
                fs.readFile(path.resolve(__dirname, './views/timeLine/timeLine.html'), function (err, data) {
                    var $ = cheerio.load(data.toString());
                    var el = $('body').find('script[src*=bundle]');
                    for (var i = 0, ii = el.length; i < ii; i++) {
                        var item = $(el[i]);
                        item.attr('src', item.attr('src').replace(/bundle\.(.*)js/, 'bundle.' + stats.hash + '.js'));
                    }
                ***REMOVED***
            ***REMOVED***
        }]
};