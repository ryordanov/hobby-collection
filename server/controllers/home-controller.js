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

        let itemIdToUpdate = req.body.itemIdToUpdate,
            itemValueToUpdate = req.body.itemValueToUpdate;

        gum.setItemsById(itemIdToUpdate, itemValueToUpdate);

        res.send(itemIdToUpdate);
        res.end();
        //res.redirect('/expand');
        //res.render('home/index', { title: 'Картинки от дъвки', collections: gum.wholeCollection() });
    }
};
