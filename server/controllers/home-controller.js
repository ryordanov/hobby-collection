//let gum = require('../utilities/gum').seedGumInserts();
let gum = require('../utilities/gum');

module.exports = {
    index: (req, res) => {
        res.render('home/index', { title: 'Картинки от дъвки', collections: gum.wholeCollection() });
    },
    expand: (req, res) => {
        res.render('home/listItems', { title: 'Разширен списък', collections: gum.getAllExpandIdentifiers() });
    },
    collapse: (req, res) => {
        //console.log(req.session.secr);
        //req.session.secr = null;

        res.render('home/listItems', { title: 'Сбит списък', collections: gum.getAllCollapsedItems() });
    },
    about: (req, res) => {
        res.render('home/about');
    },
    update: (req, res) => {
        //TODO: check where we come from and after save redirect to that page
//promiseify(req, res, console.log) ;

        let itemIdToUpdate = req.body.itemIdToUpdate,
            itemValueToUpdate = req.body.itemValueToUpdate;

        let result = gum.setItemsById(itemIdToUpdate, itemValueToUpdate);
        
        res.send(result);
        res.end();
        
        
        //res.send(result);
        //res.end();
  

        //res.redirect('/expand');
        //res.render('home/index', { title: 'Картинки от дъвки', collections: gum.wholeCollection() });
    }
};

// function promiseify(request, response, next) {
//     response.promise = function(promise) {
//         promise.then(function(result) {
//             responseText = '...' // add standard stuff around result
//             response.send(responseText);
//         }).catch(function(error) {
//             responseText = '...' // create a nice error message
//             response.send(responseText);
//         });
//     }

//     next();
// }