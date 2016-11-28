//let gum = require('../utilities/gum').seedGumInserts();
let gum = require('../utilities/gum');

module.exports = {
    index: (req, res) => {
        res.render('home/index', { title: 'Картинки от дъвки', collections: gum.wholeCollection() });
    },
    expand: (req, res) => {
        res.render('home/index', { title: 'Разширен списък без допълнителен текст', collections: gum.getAllExpandIdentifiers() });
    },
    expandAll: (req, res) => {
        res.render('home/index', { title: 'Разширен списък с допълнителен текст', collections: gum.getAllExpandIdentifiersAndText() });
    },
    collapse: (req, res) => {
        res.render('home/editItems', { title: 'Сбит списък', collections: gum.getAllCollapsedItems() });
    },
    about: (req, res) => {
        res.render('home/about');
    },
    update: (req, res) => {
        //console.log( req.params.id); - doesn't work
         gum.setItemsById(req.body.itemIdToUpdate, req.body.itemValueToUpdate, function(err, data) {
            if (err) console.log(err);

            res.send(data);
            res.end();
        });
        //res.redirect('/expand');
    }
};
