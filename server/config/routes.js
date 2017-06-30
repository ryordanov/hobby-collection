var bodyParser = require('body-parser');
let controllers = require('../controllers');

module.exports = (app) => {

    app.use('*', function(req, res, next) {
        console.log('req.originalUrl', req.originalUrl);
        next();
    });

    app.get('/favicon.ico', function(request, response) {
        response.sendFile(path.resolve(__dirname, 'public', 'favicon.ico'));
    });

    app.get('/backendRequest', function(request, response) {
        response.send({ a: 1 });
    });

    app.get('/listItems', function(request, response) {
        response.send({ b: 2 });
    });
    // handle every other route with index.html, which will contain
    // a script tag to your application's JavaScript file(s).
    app.get('*', function(request, response) {
        console.log('*: ', request.originalUrl);

        response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });

    // app.use(bodyParser.urlencoded({ extended: false }));     // to support URL-encoded bodies
    // app.use(bodyParser.json());       // to support JSON-encoded bodies
    // // app.set('view options', { pretty: true });

    // /*    app.get('/', (req, res) =>{
    //         res.render('index');
    //     }); */

    // app.get('/', controllers.home.index);
    // app.get('/expand', controllers.home.expand);
    // app.get('/expandAll', controllers.home.expandAll);

    // app.get('/collapse', controllers.home.collapse);
    // app.get('/about', controllers.home.about);

    // app.post('/save', controllers.home.update);
    // app.post('/save/:id', controllers.home.update);

    // app.all('*', (req, res) => {
    //     res.status(404);
    //     res.send('File not found');
    //     res.end();
    // });
};
