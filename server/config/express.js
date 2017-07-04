const bodyParser = require('body-parser');
const express = require('express');

module.exports = (config, app) => {
    // app.set('view engine', 'pug');
    // app.set('views', config.rootPath + './server/views');

    // Serve public files from static directory
    app.use(express.static(config.rootPath + 'public'));
    // to support URL-encoded bodies
    app.use(bodyParser.urlencoded({ extended: false }));
    // to support JSON-encoded bodies
    app.use(bodyParser.json());
    
    // Logging
    app.use('*', function(req, res, next) {
        console.log('request: ', req.originalUrl);
        next();
    });
};
