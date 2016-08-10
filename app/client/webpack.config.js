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
        // path: path.join(__dirname, "/bundle", "[hash]"),
        path: path.join(__dirname, "/bundle"),
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
                var timeLine = path.resolve(__dirname, './views/timeLine/timeLine.html');
                fs.readFile(timeLine, function (err, data) {
                    var $ = cheerio.load(data.toString(), {
                        recognizeSelfClosing: true
                    ***REMOVED***
                    var el = $('body').find('script[src*=bundle]');
                    for (var i = 0, ii = el.length; i < ii; i++) {
                        var item = $(el[i]);
                        item.attr('src', item.attr('src').replace(/bundle\.(.*)js/, 'bundle.' + stats.hash + '.js'));
                    }
                    fs.writeFile(timeLine, $.html(), function (err) {
                        !err && console.log('Set has success: ' + stats.hash)
                    })
                ***REMOVED***
            ***REMOVED***
        }]
};