//let gum = require('../utilities/gum').seedGumInserts();
let gum = require('../utilities/gum');

module.exports = {
    index: (req, res) => {
        res.render('home/index', {title: 'Картинки от дъвки', collections: gum.wholeCollection()});
    },
    expand: (req, res) => {
        res.render('home/listItems', {title: 'Разширен списък', collections: gum.getAllExpandIdentifiers()});
    },
    collapse: (req, res) => {
        res.render('home/listItems', {title: 'Сбит списък', collections: gum.getAllCollapsedItems()});
    },
    about: (req, res) => {
        res.render('home/about');
    }
};
