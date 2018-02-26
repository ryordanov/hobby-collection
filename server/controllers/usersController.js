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
        let query = usersModel.find({ username: req.body.username, password: req.body.password }, function (err, response) {
            if (err) {
                console.log('userModel query error: ', err);
            }
        });

        return query.exec()
            .then((data) => {
                req.session.isAuthenticated = !!data.length;

                if (req.session.views) {
                    req.session.views++;
                    res.send({ data: 'views: ' + req.session.views + 'expires in: ' + (req.session.cookie.maxAge / 1000) + 's' });
                } else {
                    req.session.views = 1;
                    res.send({ data: 'welcome to the session demo. refresh!' });
                }
            })
    },
    signup: (req, res) => {
        var filter = {}, // { username: { $exists: true, $eq: req.body.username } },
            update = { username: req.body.username, email: req.body.email, password: req.body.password },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        usersModel.find({ $or: [{ username: req.body.username }, { email: req.body.email }] }, function (err, response) {
            if (err) console.log('userModel query error: ', err);
        }).exec()
            .then((data) => {
                if (data.length) {
                    console.log('# Mongo - user already exist (' + req.body.username + ')');
                    res.send({ data: 'User already exists!' })
                } else {
                    let user = new usersModel(update);
                    user.save(function (err, result) {
                        if (err) {
                            console.log('# Mongo insert user error: ', err)
                        }
                        req.session.isAuthenticated = true;
                        res.send({ data: 'User has been created successfully' })
                    });
                }
            })

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
                res.redirect('/');
            }
        });
    }
};
