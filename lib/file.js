const fs = require('fs');
const path = require('path');

let watchlist = [];

// Small Helper function to sepearate the filename and directory name.
function splitFileName(filename) {
    let splittedName = filename.split(/[\\\/]+/);
    let fileName = splittedName.pop();
    let directoryName = path.resolve(splittedName.join("/")) + "/";
    return [fileName, directoryName];
}

function watchFile(filepath, callback) {
    if (!watchlist.includes(filepath)) {
        fs.watch(filepath, () => {
            callback();
        });
        watchlist.push(filepath);
    }
}


module.exports = { splitFileName, watchFile };