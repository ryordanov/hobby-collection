let controllers = require('../controllers');

var bodyParser = require('body-parser');

module.exports = (app) => {

    app.use(bodyParser.urlencoded({ extended: false }));     // to support URL-encoded bodies
    app.use(bodyParser.json());       // to support JSON-encoded bodies
    app.set('view options', { pretty: true });

    /*    app.get('/', (req, res) =>{
            res.render('index');
        });*/

    app.get('/', controllers.home.index);
    app.get('/expand', controllers.home.expand);
    app.get('/collapse', controllers.home.collapse);
    app.get('/about', controllers.home.about);

    app.post('/save', controllers.home.update);
    app.post('/save/:id', controllers.home.update);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('File not found');
        res.end();
    })
};
