***REMOVED***
 * Created by YouHan on 2016/8/24.
***REMOVED***
var fs = require('fs');
var cheerio = require('cheerio');


function deleteFolderRecursive(path) {
    console.log(path);
    if (fs.existsSync(path)) {
        console.log('here------------------');
        fs.readdirSync(path).forEach(function (file) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        ***REMOVED***
        fs.rmdirSync(path);
    }
}

function updateFile(paths, stats) {
    paths && paths.forEach(function (path) {
        fs.readFile(path, function (err, data) {
            var $ = cheerio.load(data.toString(), {
                recognizeSelfClosing: true
            ***REMOVED***
            var el = $('body').find('script[src*=bundle]');
            for (var i = 0, ii = el.length; i < ii; i++) {
                var item = $(el[i]);
                item.attr('src', item.attr('src').replace(/bundle\.(.*)js/, 'bundle.' + stats.hash + '.js'));
            }
            fs.writeFile(path, $.html(), function (err) {
                !err && console.log('Set has success: ' + stats.hash)
            })
        ***REMOVED***

    })
}


module.exports = {
    deleteFolderRecursive: deleteFolderRecursive,
    updateFile: updateFile
};