/* eslint-disable no-console */
var mongoose = require('mongoose');
let requredValidationMessage = '{PATH} is required';

let UserAccount = new mongoose.Schema({
    id: { type: Number, required: requredValidationMessage, unique: true },
    username: { type: String, required: requredValidationMessage },
    email: { type: String, required: requredValidationMessage },
    password: { type: String, required: requredValidationMessage }
});
var usersModel = mongoose.model('users', UserAccount);

module.exports = {
    login: (req, res) => {
        console.log('req.sessionID', req.sessionID);

        req.session.isAuthenticated = req.body.username;

        if (req.session.views) {
            req.session.views++;
            // res.setHeader('Content-Type', 'text/html');
            // res.write('<p>views: ' + req.session.views + '</p>');
            // res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>');
            res.send({ data: 'views: ' + req.session.views + 'expires in: ' + (req.session.cookie.maxAge / 1000) + 's' });
        } else {
            req.session.views = 1;
            res.send({ data: 'welcome to the session demo. refresh!' });
        }
    },
    signup: (req, res) => {
        req.session.isAuthenticated = req.body.username;

        var filter = {}, // { username: { $exists: true, $eq: req.body.username } },
            update = { username: req.body.username, email: req.body.email, password: req.body.password },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        // Find the document
        // usersModel.findOneAndUpdate(filter, update, options, function(error, result) {
        usersModel.update(
            { username: req.body.username },
            {
                $set: {username: req.body.username},
                $setOnInsert: update
            },
            { upsert: true }
            , function(error, result) {
                if (error) return;

                // do something with the document
                res.send({ result });
            });


    },
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log('session destroy error: ', err);
            } else {
                res.redirect('/');
            }
        });
    }
};
