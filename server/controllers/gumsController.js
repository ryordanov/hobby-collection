/* eslint-disable no-console */
// let gum = require('../utilities/gum').seedGumInserts();
let gum = require('../utilities/gum');
let captions = require('../config/translation')['bg'];

module.exports = {
    getCollections: (req, res) => {


        if (req.session.isAuthenticated) {
            console.log('logged user - return requested data');
        } else {
            console.log('redirect to index.html / login page');
        }
        // res.send(gum.getCollections());
        // let constraints = req.query || req.body;
        let constraints = {/*...req.query, */option: req.query.option, collectionName: req.params.name, subCollectionName: req.params.subcollection };
        gum.getCollections(constraints)
            .then(data => {
                return res.send(data);
            })
            .catch((err) => {
                console.log('err (getCollections)', err);
                return res.send(err);
            });
    },
    update: (req, res) => {
        gum.updateById(req.params.id, req.body)
            .then(data => res.send(data))
            .catch((err) => {
                console.log('err (update)', err);
                return res.send(err);
            });
    }

    //pug
    // index: (req, res) => {
    //     res.render('home/index', { title: captions, collections: gum.wholeCollection() });
    // },
    // expand: (req, res) => {
    //     res.render('home/index', { title: captions, is_checked2: true, collections: gum.getAllExpandIdentifiers() });
    // },
    // expandAll: (req, res) => {
    //     res.render('home/index', { title: captions, is_checked3: true, collections: gum.getAllExpandIdentifiersAndText() });
    //     // bottom lines will use async functions and callback to read the whole DB collection on page display
    //     // gum.getAllExpandIdentifiersAndText(function (err, arrOfObjects){
    //     // if (err) console.log(err);
    //     // res.render('home/index', { title: 'Разширен списък с допълнителен текст', collections: arrOfObjects });
    //     // })
    // },
    // collapse: (req, res) => {
    //     res.render('home/editItems', { title3: captions[3], collections: gum.getAllCollapsedItems() });
    // },
    // about: (req, res) => {
    //     res.render('home/about');
    // },
    // update: (req, res) => {
    //     // console.log( req.params.id); - doesn't work
    //     gum.setItemsById(req.body.itemIdToUpdate, req.body.itemValueToUpdate, function(err, data) {
    //         if (err) console.log(err);

    //         res.send(data);
    //         res.end();
    //     });
    //     // res.redirect('/expand');
    // }
};
