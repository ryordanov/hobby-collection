//Read data from file
//Parse data as JSON and assign to a variable
//In the event of an error, assign an empty array to that variable
//push the message object onto the end of the array
//stringify the array
//Overwrite the file with the new string
var fs = require('fs');

function doesExist(fileName) {
    try {
        fs.statSync(fileName);
        return true;
    } catch (err) {
        return !(err && err.code === 'ENOENT');
    }
}

module.exports = {
    putObj: function (path, obj) {
        if (!doesExist(path)) {
            fs.openSync(path, 'wx');
        }

        var configFile = fs.readFileSync(path);
        if (configFile.length > 0) {
            var config = JSON.parse(configFile);
            config.push(obj);
        } else {
            var config = [obj];
        }

        var configJSON = JSON.stringify(config);
        fs.writeFileSync(path, configJSON);

        return true;    //to check for errors and return false in some cases?
    },

    getObj: function (path) {
        //var curdir = __dirname.split("/").pop();

        var data = fs.readFileSync(path, 'utf8');

        return JSON.parse(data);
    }
}


/*
let objToJsonFile = require('../utilities/objToJsonFile');
var customConfiguration = objToJsonFile.getObj('../custom-configuration.json');
for (var i = 0; i < customConfiguration.length; i++) {
    console.log(customConfiguration[i].env);
    console.log(customConfiguration[i].db);
    //var obj = customConfiguration[i];
    //for (var key in obj) {
    //    console.log(i + '>' + key + ': ' + obj[key]);
    //}
}*/
