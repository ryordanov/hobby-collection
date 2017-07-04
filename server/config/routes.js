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

    app.get('/item/:id', function(request, response) {
        response.send(getItems(request.params.id | 0));
    });

    app.get('/items', function(request, response) {
        response.send(getItems(1));
    
        // response.send({ b: 2 });
    });

    // handle every other route with index.html, which will hold a React application
    app.all('*', function(request, response) {
        console.log('*: ', request.originalUrl);
        response.sendFile(path.resolve(config.rootPath, 'public/index.html'));
    });

    // app.all('*', (req, res) => {
    //     res.status(404);
    //     res.send('File not found');
    //     res.end();
    // });
};

function getItems(id) {
    var items = controllers.home.getItemList(id);
    var margins = controllers.home.getCollection(id)['margins'].split('-');
    var start = margins[0] | 0;
    var end = margins[margins.length - 1] | 0;

    var all = [], having = [], missing = [], merged = [];
    
    if (start && end) {
        for (let i = start; i < end; i++) {
            all.push(i + '');
        }

        items.split(',').forEach((element) => {
            if (element.indexOf('-') === -1) {
                let n = element.split(/\D+/g)[0];
                having.push(n);
            } else {
                let n = element.split('-');
                let i = n[0] | 0;
                let j = n[n.length - 1] | 0;

                for (let k = i; k < j; k++) {
                    having.push(k + '');
                }

                having.push(j + '');
            }
        });

        missing = all.filter(element => having.indexOf(element) === -1);
    }

    return {items: items, having: having, missing: missing};
}
