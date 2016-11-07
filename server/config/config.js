const path = require('path');
let rootPath = path.normalize(path.join(__dirname, '../../'));
//let env = process.env.NODE_ENV || 'development';
var hostname = require("os").hostname() || 'localhost';
var privateConfiguration = require('../../../private-configuration.js')[hostname];
console.log("hostname: " + hostname);

module.exports = {
    rootPath: rootPath,
    db: privateConfiguration.db || 'mongodb://localhost:27017/guminserts-db',
    port: privateConfiguration.port || 10101
    /*,
     production: {
     rootPath: rootPath,
     db: privateConfiguration.db,
     port: 10102
     }*/
};
