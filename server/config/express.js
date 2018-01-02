const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');

module.exports = (config, app) => {
    // uncomment next two lines in case of using PUG templates
    // app.set('views', config.rootPath + './server/views');
    // app.set('view engine', 'pug');

    // Serve public files from static directory
    app.use(express.static(config.rootPath + 'public'));
    // to support URL-encoded bodies
    app.use(bodyParser.urlencoded({ extended: false }));
    // to support JSON-encoded bodies
    app.use(bodyParser.json());

    app.use(compression());
    // app.use(express.compress());

    // Logging
    app.use('*', function(req, res, next) {
        console.log('request: ', req.method, ' ', req.protocol, ' ', req.host, ' ', decodeURIComponent(req.originalUrl));
        next();
    });
};
