/* eslint-disable no-console */
var mongoose = require('mongoose');
let requredValidationMessage = '{PATH} is required';

let UserSchema = new mongoose.Schema({
    // id: { type: Number, required: requredValidationMessage, unique: true },
    username: { type: String, required: requredValidationMessage, unique: true },
    email: { type: String, required: requredValidationMessage, unique: true },
    password: { type: String, required: requredValidationMessage }
});
var usersModel = mongoose.model('users', UserSchema);

module.exports = {
    login: (req, res) => {
        usersModel.findOne({ username: req.body.username, password: req.body.password }, 'id email username', function(err, data) {
            if (err) {
                console.log('userModel query error: ', err);
            }

            let status;
            let statusText = '';

            if (data) {
                status = 200;
                statusText = 'Login successful';
                // req.session.isAuthenticated = true;
                req.session.loggedUser = {
                    id: data.id,
                    username: data.username,
                    email: data.email
                };
            } else {
                status = 401;
                statusText = 'Wrong login credentials';
                // req.session.isAuthenticated = false;
                delete req.session.loggedUser;
            }
            res.status(status).send({ responseStatus: statusText, isAuthenticated: !!req.session.loggedUser });

            // if (req.session.views) {
            //     req.session.views++;
            //     res.status(status).send({ data: 'views: ' + req.session.views + 'expires in: ' + (req.session.cookie.maxAge / 1000) + 's' });
            // } else {
            //     req.session.views = 1;
            //     res.status(status).send({ data: 'welcome to the session demo. refresh!' });
            // }

        });
    },
    signup: (req, res) => {
        var filter = { $or: [{ username: req.body.username }, { email: req.body.email }] },
            update = { username: req.body.username, email: req.body.email, password: req.body.password };
        // options = { upsert: true, new: true, setDefaultsOnInsert: true };

        usersModel.find(filter, function(err, data) {
            if (err) console.log('userModel query error: ', err);

            if (data && data.length) {
                console.log('# Mongo - user or email already exists (' + req.body.username + ') or (' + req.body.email + ') ');
                res.status(401).send({ responseStatus: 'User already exists!', isAuthenticated: false });
            } else {
                let user = new usersModel(update);
                user.save(function(err, result) {
                    if (err) {
                        console.log('# Mongo insert user error: ', err);
                    }
                    // req.session.isAuthenticated = true;
                    req.session.loggedUser = {
                        id: result.id,
                        username: result.username,
                        email: result.email
                    };
                    res.status(200).send({ responseStatus: 'User has been created successfully', isAuthenticated: true });
                });
            }
        });

        // usersModel.update(
        //     { username: req.body.username },
        //     {
        //         $set: { username: req.body.username },
        //         $setOnInsert: update
        //     },
        //     { upsert: true }
        //     , function (error, result) {
        //         if (error) return;

        //         // do something with the document
        //         res.send({ result });
        //     });


    },
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) {
                console.log('session destroy error: ', err);
            } else {
                // res.redirect('/');
                res.send({ responseStatus: 'Logout successful', isAuthenticated: false });
            }
        });
    }
};
