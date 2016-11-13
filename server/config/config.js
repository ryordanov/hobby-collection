//let env = process.env.NODE_ENV || 'development';
const path = require('path');
let rootPath = path.normalize(path.join(__dirname, '../../'));
var hostname = require("os").hostname() || 'localhost';

if (doesExist('../../../private-configuration.js')) {
    var privateConfiguration = require('../../../private-configuration.js')[hostname];
}

console.log('hostname: ' + hostname);
console.log('------------------------------');

module.exports = {
    rootPath: rootPath,
    db: privateConfiguration.db || 'mongodb://localhost:27017/guminserts-db',
    port: privateConfiguration.port || 10101
};

function doesExist(fileName) {
    try {
        fs.statSync(fileName);
        return true;
    } catch (err) {
        return !(err && err.code === 'ENOENT');
    }
}
