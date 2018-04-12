/* eslint-disable no-console */
// let gum = require('../utilities/gum').seedGumInserts();
let gum = require('../utilities/gum');
// let captions = require('../config/translation')['bg'];

module.exports = {
    getCollections: (req, res) => {
        let loggedUser = (req.session && req.session.loggedUser) || null;
        if (loggedUser && loggedUser.id) {
            const constraints = { ownerId: loggedUser.id, /*...req.query, */options: req.query, collectionPath: req.params[0] };
            gum.getCollections(constraints/*, req.session.loggedUser*/)
                .then(data => {
                    return res.send(data);
                })
                .catch((err) => {
                    console.log('err (getCollections)', err);
                    return res.send(err);
                });
        } else {
            console.log('redirect to index.html / login page');
            res.status(401).send();
        }
        // res.send(gum.getCollections());
        // let constraints = req.query || req.body;

    },
    getItem: (req, res) => {
        let loggedUser = (req.session && req.session.loggedUser && req.session.loggedUser.id) || null;
        if (loggedUser) {
            gum.getItem(req.params.oid, req.body, req.query)
                .then(data => res.status(200).send(data))
                .catch((err) => {
                    console.log('gumsController error (getItem)', err);
                    return res.send(err);
                });
        } else {
            console.log('redirect to index.html / login page');
            res.status(401).send();
        }
    },
    update: (req, res) => {
        let loggedUser = (req.session && req.session.loggedUser && req.session.loggedUser.id) || null;
        if (loggedUser) {
            gum.updateById(req.params.id, req.body, req.query)
                .then(data => res.status(200).send(data))
                .catch((err) => {
                    console.log('gumsController error (update)', err);
                    return res.send(err);
                });
        }
    },
    create: (req, res) => {
        let loggedUser = (req.session && req.session.loggedUser && req.session.loggedUser.id) || null;
        if (loggedUser) {
            gum.createNewItem(loggedUser, req.body, req.query)
                .then(data => res.status(200).send(data))
                .catch((err) => {
                    console.log('gumsController error (create)', err);
                    return res.send(err);
                });
        } else {
            res.send({ responseStatus: 'Access forbiden for unauthorized users!', isAuthenticated: false });
        }
    },
    delete: (req, res) => {
        let loggedUser = (req.session && req.session.loggedUser && req.session.loggedUser.id) || null;
        if (loggedUser) {
            gum.deleteItem(loggedUser, req.params.id /*, req.body, req.query*/ )
                .then(data => res.status(200).send(data))
                .catch((err) => {
                    console.log('gumsController error (create)', err);
                    return res.send(err);
                });
        }
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
