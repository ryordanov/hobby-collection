var mongoose = require('mongoose');

let requredValidationMessage = '{PATH} is required';
let generalCollectionsSchema = new mongoose.Schema({
    id: { type: Number, required: requredValidationMessage, unique: true },
    ownerId: { type: String, required: requredValidationMessage },
    make: { type: String, required: requredValidationMessage },
    serie: { type: String },
    margins: { type: String },
    items: { type: Object }
});
var generalCollectionsModel = mongoose.model('generalCollections', generalCollectionsSchema);
let delimiter = ',';

// function tmpCompare(original, modified, item) {
//     let eq = true;
//     for (const key in original) {
//         if (/* key && */ original.hasOwnProperty(key)) {
//             eq = eq //&& original[key] === modified[key]
//                 && modified.hasOwnProperty(key)
//                 && original[key]['cnt'] === modified[key]['cnt']
//                 && original[key]['note'] === modified[key]['note'];
//         } else {
//             console.log('wrong', original, modified, item);
//         }
//     }
//     return eq;
// }

function typeOfResult(option, items) {
    switch (option) {
        case 'SQUISHED':
            return squishObjToString(items);
        case 'NUMBERS':
            return Object.keys(items).join(',');
        default:
            return Object.keys(items).join(',');
    }
}
// var self = 
module.exports = {
    getCollections: (criteria/*, authenticatedUser*/) => {
        return DBFetchData(criteria)
            .then(collection => {
                collection.forEach(function(item, index) {
                    // let formattedItemsStr = squishObjToString(item.items);
                    // let formattedItemObj = expandStringToObj(formattedItemsStr);
                    // console.log(tmpCompare(item.items, formattedItemObj, item), item.make + '---'+item.serie);

                    collection[index]['items'] = typeOfResult(criteria.option || '', item.items || {});

                    // collection[index]['ownerId'] = authenticatedUser.id || '';
                    // self.updateById(collection[index]['oid'], collection[index]);
                }, this);

                return collection;
            });
    },
    updateById: (id, updatedData) => {
        var oid = mongoose.Types.ObjectId(id);

        return generalCollectionsModel.findByIdAndUpdate(oid, {
            items: expandStringToObj(updatedData.items)
            // ownerId: updatedData.ownerId
        }, { new: true }).exec()
            .then((updatedData) => {
                if (updatedData) {
                    return {
                        items: squishObjToString(updatedData.items),
                        make: updatedData.make,
                        serie: updatedData.serie,
                        id: updatedData.id,
                        oid: updatedData._id.toString()
                    };
                }
            })
            .catch((err) => {
                console.log('Mongo error (updateById)', err);
            });
    }
};

// helper functions
function DBFetchData(criteria) {
    console.log('DBFetchData - criteria', criteria);
    let dbCriteria = { ownerId: criteria.ownerId };

    if (criteria.collectionName) {
        dbCriteria.make = criteria.collectionName;
    }
    if (criteria.subCollectionName) {
        dbCriteria.serie = criteria.subCollectionName;
    }

    let query = generalCollectionsModel.find(dbCriteria, function(err, gums) {
        if (err) {
            console.log('DBFetchData query error: ', err);
        } else
            console.log('Total number of items: ' + gums.length);
    })
        .sort('id');

    return query.exec()
        .then((data) => {
            let details = [];
            data.forEach(function(singleCollection) {
                details.push({
                    'oid': singleCollection._id.toString(),
                    'id': singleCollection.id,
                    'make': singleCollection.make,
                    'serie': singleCollection.serie,
                    'margins': singleCollection.margins,
                    'items': encodeItem(singleCollection.items)
                });
            }, this);
            return details;
        })
        .catch((err) => {
            console.log('DBFetchData catch error: ', err);
            return err;
        });
}

// convert mongoose encoded (_dot_) key to . and (_dollar_) to $ - special symbols in mongo db
function encodeItem(itemsObject) {
    let encodeditemsObject = {};

    for (var key in itemsObject) {
        if (itemsObject.hasOwnProperty(key)) {
            let encodedKey = key;
            if (key.includes('[_dot_]')) {
                encodedKey = key.replace(/\[_dot_\]/g, '.');
            } else if (key.includes('[_dollar_]')) {
                encodedKey = key.replace(/\[_dollar_\]/g, '$');
            }
            encodeditemsObject[encodedKey] = itemsObject[key];
        }
    }
    return encodeditemsObject;
}

//mongo object to single row string
function squishObjToString(itemsObj) {
    let identifiersArr = Object.keys(itemsObj);

    let i = 0,
        res = '',
        // delimiter = ',',
        iMax = identifiersArr.length;

    while (i < iMax) {
        let j = 1;

        while (/* (i+j < iMax) && */ (identifiersArr[i + j - 1] == identifiersArr[i + j] - 1)
            && (itemsObj[identifiersArr[i + j - 1]].cnt == 1)
            && (!itemsObj[identifiersArr[i + j - 1]].note)) {
            j++;
        }

        if ((itemsObj[identifiersArr[i + j - 1]].note ||
            itemsObj[identifiersArr[i + j - 1]].cnt > 1) &&
            j > 1) {
            j--;// item with note to be outside x-y, but separated
        }

        if (j > 2) res += identifiersArr[i] + '-' + identifiersArr[i + j - 1];
        else if (j == 2) res += identifiersArr[i] + delimiter + identifiersArr[i + j - 1];
        else res += identifiersArr[i + j - 1];

        if ((itemsObj[identifiersArr[i + j - 1]].note) && (itemsObj[identifiersArr[i + j - 1]].cnt > 1)) {	// count and notes
            res += '(' + itemsObj[identifiersArr[i + j - 1]].cnt + ';' + itemsObj[identifiersArr[i + j - 1]].note + ')';
        } else if (itemsObj[identifiersArr[i + j - 1]].cnt > 1) {	// count only
            res += '(' + itemsObj[identifiersArr[i + j - 1]].cnt + ')';
        } else if (itemsObj[identifiersArr[i + j - 1]].note) {	// notes only
            res += '(' + itemsObj[identifiersArr[i + j - 1]].note + ')';
        }
        res += delimiter;
        i += j;
    }
    return res.slice(0, -delimiter.length);// remove last ','
}

//convert string representation of items to object with key=item name (v)
// function expandStringToObj2(items) {
//     let itemsObj = {};

//     // let regex = /(\w+\(\w+\))|(\w+\(\w+;\w+\))|(\d+\-\d+)|(\d+)/g;
//     // let negativeLookbehind = /(?<!\()/; // not supported in JS
//     // let regex = /(\w+(?:\(\w+(?:\;[\w+|\*]+){0,1}\){0,1}){0,1}(?:\-\w+){0,1})/g;
//     // let regex = /([\p{Cyrillic}\w]+(?:\([\p{Cyrillic}\s\w\*\-]+(?:\;[\p{Cyrillic}\s\w\*]+){0,1}\){0,1}){0,1}(?:\-\w+){0,1})/g;
//     // let regMatch = items.match(regex);

//     let regex = /([\wа-я♦♥♠♣\s]+(?:\([\wа-я\s\-\/\*\:\.\?]+(?:\;[\wа-я\s\*]+){0,1}\){0,1}){0,1}(?:\-\w+){0,1})/ig;
//     let regMatch = items.match(regex);

//     // let regex = /(^\d+$)|(^\d+\-\d+$)|(^\d+\(\w+\)$)|(^\d+\(\w+\;\w+\)$)/;
//     // // let lastComaRegex = /^(.*)\,+$/;
//     // let comaRegex = /(\,)\s*/g;

//     // items = items./*replace(lastComaRegex, '$1').*/replace(comaRegex, '$1').split(',').filter(element => regex.test(element)); // valid items only

//     regMatch && regMatch.forEach(part => {

//         let m = part.match(/^(\d+)[-](\d+)$/);

//         if (m != null) {
//             for (let j = parseInt(m[1]); j <= parseInt(m[2]); j++) {
//                 itemsObj['' + j] = itemsObj['' + j] || {};
//                 itemsObj['' + j].cnt = (itemsObj['' + j].cnt || 0) + 1;
//             }
//         } else {
//             let splitted = splitItemToComponents(part); // TODO: regex
//             itemsObj[splitted.number] = itemsObj[splitted.number] || {};
//             itemsObj[splitted.number].cnt = (itemsObj[splitted.number].cnt || 0) + splitted.counts;

//             if (splitted.text) {
//                 itemsObj[splitted.number].note = splitted.text;
//             }
//         }
//     });
//     return itemsObj;
// }
//convert string representation of items to object with key=item name (v)
function expandStringToObj(items) {
    // let itemsCountText = { items: {}, text: {} };         // items:{1:4, 3:1, 5:1, 6:3}, text:{6:'*', 10:'sometext'}
    let itemsCountText = {};         // {1:{cnt: 4, note: ''}, 3:{cnt: 1, note: ''}, 5:{cnt: 1, note: '*'}, 6:{cnt: 3, note: ''}}


    items = items.split(',');

    if (isNumber(items[0].substr(0, 1))) {      // to be replaced with REGEX some bright day!!! "1,3(7),4(txt),5-10,12(2;ttt)"
        for (let i = 0; i < items.length; i++) {
            let item = items[i].trim(),
                m = item.match(/^(\d+)[-](\d+)$/);

            if (m != null) {
                let iMin = parseInt(m[1]),
                    iMax = parseInt(m[2]);

                for (let j = iMin; j <= iMax; j++) {
                    addItemToObject(itemsCountText, j, 1, null);
                }
            } else // ако има (text) след числото - се вади в нов асоциативен масив/обект
            if (item.length) {                   // ако няма тире между запетайките, но има все пак нещо
                let itemComponents = splitItemToComponents(item);   // [number=51, counts=1, text=""]   "" or null
                addItemToObject(itemsCountText, itemComponents.number, itemComponents.counts, itemComponents.text);
            }
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemComponents = splitItemToComponents(item);   // [number=51, counts=1, text=""]   "" or null -> to be replaced with REGEX?
            addItemToObject(itemsCountText, itemComponents.number, itemComponents.counts, itemComponents.text);
        }
    }
    return itemsCountText;
}

function addItemToObject(itemsCountText, item, count, text) {
    let key = item.toString();
    if (key.includes('.')) {
        key = key.replace(/\./g, '[_dot_]');
    } else if (key.includes('$')) {
        key = key.replace(/\$/g, '[_dollar_]');
    }
    if (key in itemsCountText) {
        itemsCountText[key].cnt += count;
    } else {
        itemsCountText[key] = { 'cnt': count };
    }
    if (text !== null) {
        itemsCountText[key]['note'] = text;
    }
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

// "1,3(7),4(txt),5-10,12(2;ttt)"  ---> [number=X, counts=Y, text="Z"]
function splitItemToComponents(item) {
    // let item = "3(7;texxxt)";
    let leftBracket = item.indexOf('('),
        rightBracket = item.indexOf(')'), // трябва да търси отзад напред, ако има (2;текст(ощетекст))
        number = parseInt(item),
        counts = 1,
        text = null;

    if (isNaN(number)) {
        if (leftBracket > -1) {
            number = item.substring(0, leftBracket);
        } else {
            number = item;
        }
    }

    if (leftBracket > -1) { // and rigthBracket > -1 to be sure...
        let additionalText = item.substring(leftBracket + 1, rightBracket);
        let semiColon = item.indexOf(';');

        if (semiColon > -1) { // there is a separator between count and notes
            counts = parseInt(item.substring(leftBracket + 1, semiColon));
            text = item.substring(semiColon + 1, rightBracket);
        } else { // either count or notes
            let isTxtTmp = parseInt(additionalText);
            if (isNaN(isTxtTmp)) { // notes
                text = additionalText;
            } else { // count
                counts = isTxtTmp;
            }
        }
    }
    return { 'number': number, 'counts': counts, 'text': text };
}