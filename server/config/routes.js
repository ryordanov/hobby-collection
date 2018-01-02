let path = require('path');
let controllers = require('../controllers');

module.exports = (config, app) => {
    // app.get('/', controllers.home.index);
    // app.get('/expand', controllers.home.expand);
    // app.get('/expandAll', controllers.home.expandAll);

    // app.get('/collapse', controllers.home.collapse);
    // app.get('/about', controllers.home.about);

    // app.post('/save', controllers.home.update);
    // app.post('/save/:id', controllers.home.update);

    app.get('/api/collections', controllers.gums.getCollections);
    app.get('/api/collection/:name', controllers.gums.getCollectionDetails);
    app.get('/api/collection/:name/:subcollection', controllers.gums.getSubCollectionDetails);

    app.get('/items', controllers.gums.getItems);
    app.get('/item/:id', controllers.gums.getItemDetails);
    app.get('/notFound', function(req, res) {
        res.send({ notFound: 'ERROR 404 - Not found [' + new Date() + ']' });
    });

    // app.get('/item/:id', function(request, response) {
    //     response.send(getItems(request.params.id | 0));
    // });

    // app.get('/items', function(request, response) {
    //     response.send(getItems(1));

    //     // response.send({ b: 2 });
    // });

    // handle every other route with index.html, which will hold a React application
    app.all('*', function(request, response) {
        console.log('* redirect to React: ', request.originalUrl);
        response.sendFile(path.resolve(config.rootPath, 'public/index.html'));
    });

    // app.all('*', (req, res) => {
    //     res.status(404);
    //     res.send('File not found');
    //     res.end();
    // });
};
