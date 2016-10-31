let controllers = require('../controllers');

module.exports = (app) => {

/*    app.get('/', (req, res) =>{
        res.render('index');
    });*/

    app.get('/', controllers.home.index);
    app.get('/about', controllers.home.about);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('File not found');
        res.end();
    })
};