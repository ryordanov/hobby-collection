/* eslint-disable no-console */

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//
// var requredValidationMessage = '{PATH} is required';
// var gumSchema = mongoose.Schema({
//    // _id: {type: {}},
//    id: {type: String, required: requredValidationMessage, unique: true},
//    make: {type: String, required: requredValidationMessage},
//    serie: {type: String},
//    margins: {type: String},
//    items: {type: String}
// });

// var Gum = mongoose.model('guminserts', gumSchema);
// Gum.find({}, function (err, gums) {
//    if (err) console.log(err);

//    console.log(gums);

//    gums.forEach(function (gum) {
//        console.log(gum);
//    });
// });
// module.exports.seedGumInserts = () => {
//    Gum.find({}).then(gums=> {
//        if (gums.length === 0) {
//            Gum.create({
//                id: '0',
//                make: 'Turbo',
//                serie: 'rare',
//                margins: '1-50',
//                items: '1,2,3,4,5,6,7,8,9'
//            })
//        }
//    })
// };

module.exports = (config) => {
    mongoose.connect(config.db, {
        // useMongoClient: true
        // promiseLibrary: global.Promise
    });

    let db = mongoose.connection;

    db.once('open', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('# Mongo DB: Connected to "%s" database!', config.db.substr(config.db.indexOf('@') + 1, config.db.length));

        // var collection = db.collection("guminserts");
        // collection.find({id:3}).toArray(function (err, docs) {
        //    console.log(docs[0]);
        // });
    });
    // db.on('error', err => console.log(err));
    db.on('error', console.error.bind(console, '# Mongo DB: connection error:'));
    return db;
};
