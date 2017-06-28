//let env = process.env.NODE_ENV || 'development';
const path = require('path');
const fs = require('fs');
let rootPath = path.normalize(path.join(__dirname, '../../'));
let preRootPath = path.normalize(path.join(__dirname, '../../../'));
let hostname = require("os").hostname() || 'localhost';
console.log('hostname: ' + hostname);

if (doesExist(preRootPath + 'private-configuration.js')) {
    var privateConfiguration = require(preRootPath + 'private-configuration.js')[hostname];
    var privateConfiguration_db = privateConfiguration.db;
    var privateConfiguration_port = privateConfiguration.port;
}

module.exports = {
    rootPath: rootPath,
    db: process.env.DB || privateConfiguration_db || 'mongodb://localhost:27017/hobby-collection-db',
    port: process.env.PORT || privateConfiguration_port || 10101,
    lang: 'en'
};

function doesExist(fileName) {
    try {
        fs.statSync(fileName);
        return true;
    } catch (err) {
        return !(err && err.code === 'ENOENT');
    }
}
