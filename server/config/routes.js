let path = require('path');
let controllers = require('../controllers');

module.exports = (config, app) => {
    // app.all(/\/path\/([^\/]+)\/?(.+)?/,function(req,res,next).apply..
    app.post('/api/login', controllers.users.login);
    app.post('/api/signup', controllers.users.signup);
    app.post('/api/logout', controllers.users.logout);

    app.get('/api/collections/:name?/:subcollection?', controllers.gums.getCollections);
    app.post('/api/save/:id', controllers.gums.update);

    app.get('/notFound', function(req, res) {
        res.send({ notFound: 'ERROR 404 - Not found [' + new Date() + ']' });
    });

    // handle every other route with index.html, which will hold a React application
    app.all('*', function(req, res) {
        const options = {
            headers: {
                'x-timestamp': Date.now(),
                'x-sent': true,
                'general-collection-data': 'alabala'
            }
          };

        console.log('* redirect to React: ', req.originalUrl);
        res.sendFile(path.resolve(config.rootPath, 'public/index.html'), options);
    });

    // app.all('*', (req, res) => {
    //     res.status(404);
    //     res.send('File not found');
    //     res.end();
    // });
};
