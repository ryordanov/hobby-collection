const bodyParser = require('body-parser');
const express = require('express');
const compression = require('compression');
var session = require('express-session');

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

    app.use(session({
        key: 'user_sid',
        secret: 'this-is-a-secret-token',
        cookie: { maxAge: 60000 }
        // saveUninitialized: false, // don't create session until something stored
        // resave: false, //don't save session if unmodified
        // store: new MongoStore({
        //     url: 'mongodb://localhost/test-app',
        //     touchAfter: 24 * 3600 // time period in seconds
        // })
    }));

    // I’m using connect-mongo (since it was super easy/quick to set up), and by default it automatically removes expired sessions for you. Expired sessions are those without any activity for 14 days – which is configurable.
    // https://github.com/jdesboeufs/connect-mongo

    
    // Logging
    app.use('*', function(req, res, next) {
        // req.session.someAttribute = 'foo' + new Date();
        console.log('request: ', req.method, ' ', req.protocol, ' ', req.host, ' ', decodeURIComponent(req.originalUrl));
        next();
    });
};
