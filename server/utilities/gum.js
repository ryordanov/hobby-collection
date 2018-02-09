// v100 - there are two options - 1) data from DB mongo to be taken only on server start and then local collection
//       to be updated; or 2) via callbacks on each page refresh the whole DB collection to be taken - this may
//       cause problem if the data is modified separately (with some DB manager for example)

var mongoose = require('mongoose');

let requredValidationMessage = '{PATH} is required';
// let gumSchema = new mongoose.Schema({
//     id: { type: Number, required: requredValidationMessage, unique: true },
//     make: { type: String, required: requredValidationMessage },
//     serie: { type: String },
//     margins: { type: String },
//     items: { type: String }
// });
// var Gum = mongoose.model('guminserts', gumSchema);

// new structure of items - store as object (v)
let generalCollectionsSchema = new mongoose.Schema({
    id: { type: Number, required: requredValidationMessage, unique: true },
    make: { type: String, required: requredValidationMessage },
    serie: { type: String },
    margins: { type: String },
    items: { type: Object }
});
var generalCollectionsModel = mongoose.model('generalCollections', generalCollectionsSchema);
// new structure of items - store as object (^)

/*
 module.exports.seedGumInserts = () => {
 Gum.find({}).then(gums=> {
 if (gums.length === 0) {
 Gum.create({
 id: '0',
 make: 'Turbo',
 serie: 'rare',
 margins: '1-50',
 items: '1,2,3,4,5,6,7,8,9'
 })
 }
 }
 }
 //https://www.npmjs.com/package/google-spreadsheet
 */

// var collections = [];
// Gum.find({}, function(err, gums) {
//     if (err) {
//         console.log(err);
//     }

//     collections = gums;
//     console.log('Total number of items: ' + gums.length);

//     // gums.forEach(function (gum) {
//     //   console.log(gum);
//     // });
// })
//     .sort('id');

// function fetchData() {
//     let query = Gum.find({}).sort('id');
//     return query;
// }

// /////////////////////

// function getItems(id) {
//     var items = controllers.home.getItemList(id);
//     var margins = controllers.home.getCollection(id)['margins'].split('-');
//     var start = margins[0] | 0;
//     var end = margins[margins.length - 1] | 0;

//     var all = [], having = [], missing = [], merged = [];

//     if (start && end) {
//         for (let i = start; i < end; i++) {
//             all.push(i + '');
//         }

//         items.split(',').forEach((element) => {
//             if (element.indexOf('-') === -1) {
//                 let n = element.split(/\D+/g)[0];
//                 having.push(n);
//             } else {
//                 let n = element.split('-');
//                 let i = n[0] | 0;
//                 let j = n[n.length - 1] | 0;

//                 for (let k = i; k < j; k++) {
//                     having.push(k + '');
//                 }

//                 having.push(j + '');
//             }
//         });

//         missing = all.filter(element => having.indexOf(element) === -1);
//     }

//     return { items: items, having: having, missing: missing };
// }

function tmpCompare(original, modified) {
    let eq = true;
    for (const key in original) {
        if (original.hasOwnProperty(key)) {
            eq = eq //&& original[key] === modified[key]
                && original[key]['cnt'] === modified[key]['cnt']
                && original[key]['note'] === modified[key]['note'];
        }
    }
    return eq;
}

function typeOfResult(option, items) {
    switch (option) {
        case 'CLLPS':
            return squishObjToString(items);
        case 'EXPND':
            return Object.keys(items).join(', ');
        default:
            return Object.keys(items).join(', ');
    }
}

module.exports = {
    getCollections: (criteria) => {
        return DBFetchData(criteria)
            .then(collection => {
                let formattedOutput = [];
                collection.forEach(function (item) {
                    // let formattedItemsStr = squishObjToString(item.items);
                    // let formattedItemObj = expandStringToObj(formattedItemsStr);
                    // console.log(tmpCompare(item.items, formattedItemObj), item.make + '---'+item.serie);
                    formattedOutput.push({
                        'make': item.make || '',
                        'serie': item.serie || '',
                        'margins': item.margins || '',
                        'items': typeOfResult(criteria.option || '', item.items || {})
                    });
                }, this);

                return formattedOutput;
            });
    },
    getCollectionDetails: (collectionName) => {
        return DBFetchData({ collectionName });
    },
    getSubCollectionDetails: (collectionName, subCollectionName) => {
        return DBFetchData({ collectionName, subCollectionName });
    },
    // getSubCollectionDetails: (collectionName, subCollectionName) => {
    //     let details = [];
    //     collections.forEach(function(item) {
    //         if (collectionName === item.make && subCollectionName === item.serie) {
    //             details.push({
    //                 'make': item.make,
    //                 'serie': item.serie,
    //                 'margins': item.margins,
    //                 'items': item.items
    //             });
    //         }
    //     }, this);
    //     return details;
    // },

    // getItemDetails: () => {

    // },

    // getCollection: (row) => {
    //     return collections[row];
    // },
    // getItemList: (row) => {
    //     return collections[row].items;
    // },
    // getAllExpandIdentifiers: () => {
    //     let arrOfObjects = createViewAsArray(collections, false);   // false to display only identifiers
    //     return arrOfObjects;
    // },
    // getAllExpandIdentifiersAndText: (callback) => {
    //     let arrOfObjects = createViewAsArray(collections, true);   // true to display also text
    //     return arrOfObjects;
    //     // v100.2:bottom lines will use async functions and callback to read the whole DB collection on page display
    //     // let query = fetchData();
    //     // query.exec(function(err, collections){
    //     //    let arrOfObjects = createViewAsArray(collections, true);   //true to display also text
    //     //    callback(err, arrOfObjects)
    //     // })
    // },
    // getRowOnlyIdentifiers: (row) => {
    //     let itemsCountText = convertStrToObj(collections[row].items);
    //     let result = '';

    //     for (var key in itemsCountText.items) {
    //         let count = itemsCountText.items[key];
    //         result += key + ',';
    //         while (count > 1) {
    //             result += key + ',';
    //             count--;
    //         }
    //     }
    //     return result.substr(0, result.length - 1);
    // },
    // getAllCollapsedItems: () => {
    //     var resultArr = [];

    //     for (let i = 0; i < collections.length; i++) {
    //         let tempObj = {};
    //         let row = collections[i];
    //         tempObj.id = row.id;
    //         tempObj.make = row.make;
    //         tempObj.serie = row.serie;
    //         tempObj.margins = row.margins;

    //         let itemsCountText = convertStrToObj(row.items);
    //         tempObj.items = _compactResult(itemsCountText);
    //         resultArr.push(tempObj);
    //     }
    //     return resultArr;
    // },
    // getRowCollapsedItems: (row) => {
    //     let itemsCountText = convertStrToObj(collections[row].items);

    //     return _compactResult(itemsCountText);
    // },
    // getItemsWithNotes: (row) => {
    //     let itemsCountText = convertStrToObj(collections[row].items);
    //     return JSON.stringify(itemsCountText.text);
    // },
    // ///////////// SET
    // setItemsById: (row, updatedItems, callback) => {
    //     let intId = parseInt(row);

    //     let itemsCountText = convertStrToObj(updatedItems);
    //     let itemsForDB = _compactResult(itemsCountText);

    //     Gum.findOneAndUpdate({ 'id': intId }, { $set: { 'items': itemsForDB } }, { new: true, runValidators: true }, function(err, data) {
    //         if (err) {
    //             console.log('Something wrong when updating data!');
    //         }

    //         // v100.1 update global collections in order to avoid reading every time the collection from Mongo
    //         collections[intId].items = data.items;
    //         callback(err, { 'id': data.id, 'items': data.items });
    //     });
    // }
};

// helper functions
function DBFetchData(criteria) {
    console.log('DBFetchData - criteria', criteria);
    let tmp = {};
    if (criteria.collectionName) {
        tmp.make = criteria.collectionName;
    }
    if (criteria.subCollectionName) {
        tmp.serie = criteria.subCollectionName;
    }

    let query = generalCollectionsModel.find(tmp, function (err, gums) { // Gum -> generalCollectionsModel
        if (err) {
            console.log('DBFetchData query error: ', err);
        } else
            console.log('Total number of items: ' + gums.length);
    })
        .sort('id');

    return query.exec()
        .then((data) => {
            let details = [];
            data.forEach(function (singleCollection) {
                details.push({
                    'make': singleCollection.make,
                    'serie': singleCollection.serie,
                    'margins': singleCollection.margins,
                    // 'items': singleCollection.items // TODO: replace [_dot_] [_dollar_]
                    'items': encodeItem(singleCollection.items)
                });
                // new structure of items - store as object (v)
                // new generalCollections({
                //     'id': i++,
                //     'make': item.make,
                //     'serie': item.serie,
                //     'margins': item.margins,
                //     'items': reorganizeData(item.items)
                // })
                // .save(function (err) {
                //     if (err) {
                //         return console.log(err);
                //     }
                //     // saved!
                // })
            }, this);
            // new structure of items - store as object (^)
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

    var i = 0,
        res = '',
        iMax = Object.keys(itemsObj).length;

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
            j--;// номерът с коментар да не е в интервала х-у, а да е отделен със запетая
        }

        if (j > 2) res += identifiersArr[i] + '-' + identifiersArr[i + j - 1];
        else if (j == 2) res += identifiersArr[i] + ',' + identifiersArr[i + j - 1];
        else res += identifiersArr[i + j - 1];

        if ((itemsObj[identifiersArr[i + j - 1]].note) && (itemsObj[identifiersArr[i + j - 1]].cnt > 1)) {	// бройка и коментар
            res += '(' + itemsObj[identifiersArr[i + j - 1]].cnt + ';' + itemsObj[identifiersArr[i + j - 1]].note + ')';
        } else if (itemsObj[identifiersArr[i + j - 1]].cnt > 1) {	// само бройка
            res += '(' + itemsObj[identifiersArr[i + j - 1]].cnt + ')';
        } else if (itemsObj[identifiersArr[i + j - 1]].note) {	// само коментар
            res += '(' + itemsObj[identifiersArr[i + j - 1]].note + ')';
        }
        res += ',';
        i += j;
    }
    return res.slice(0, -1);// премахва последната запетайка
}

//convert string representation of items to object with key=item name (v)
function expandStringToObj(items) {
    // let itemsCountText = { items: {}, text: {} };         // items:{1:4, 3:1, 5:1, 6:3}, text:{6:'*', 10:'sometext'}
    let itemsCountText = {};         // {1:{cnt: 4, note: ''}, 3:{cnt: 1, note: ''}, 5:{cnt: 1, note: '*'}, 6:{cnt: 3, note: ''}}

    items = items.split(',');

    if (isNumber(items[0].substr(0, 1))) {      // to be replaced with REGEX some bright day!!! "1,3(7),4(txt),5-10,12(2;ttt)"
        for (let i = 0; i < items.length; i++) {
            let item = items[i],
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

    // let sortedNumbers = sortObject(itemsCountText.items);
    // let sortedText = sortObject(itemsCountText.text);
    // return { items: sortedNumbers, text: sortedText };
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

        if (semiColon > -1) { // има разделяне на бройка и текст
            counts = parseInt(item.substring(leftBracket + 1, semiColon));
            text = item.substring(semiColon + 1, rightBracket);
        } else { // има само бройка или само текст
            let isTxtTmp = parseInt(additionalText);
            if (isNaN(isTxtTmp)) { // текст
                text = additionalText;
            } else { // брой
                counts = isTxtTmp;
            }
        }
    }
    return { 'number': number, 'counts': counts, 'text': text };
}

//convert string representation of items to object with key=item name (^)

////////////////////---------------------------- original code of reorganizeData (v)
// function convertStrToObj(items) {
//     let itemsCountText = { items: {}, text: {} };         // items:{1:4, 3:1, 5:1, 6:3}, text:{6:'*', 10:'sometext'}

//     items = items.split(',');

//     if (isNumber(items[0].substr(0, 1))) {      // to be replaced with REGEX one day!!! "1,3(7),4(txt),5-10,12(2;ttt)"
//         for (let i = 0; i < items.length; i++) {
//             let item = items[i],
//                 m = item.match(/^(\d+)[-](\d+)$/);

//             if (m != null) {
//                 let iMin = parseInt(m[1]),
//                     iMax = parseInt(m[2]);

//                 for (let j = iMin; j <= iMax; j++)
//                     {addItem(itemsCountText, j, 1, null);}
//             }            else // ако има (text) след числото - се вади в нов асоциативен масив/обект
//                 if (item.length) {                   // ако няма тире между запетайките, но има все пак нещо
//                     let itemComponents = splitItemToComponents(item);   // [number=51, counts=1, text=""]   "" or null
//                     addItem(itemsCountText, itemComponents.number, itemComponents.counts, itemComponents.text);
//                 }
//         }
//     } else {
//         for (let i = 0; i < items.length; i++) {
//             let item = items[i];
//             let itemComponents = splitItemToComponents(item);   // [number=51, counts=1, text=""]   "" or null
//             addItem(itemsCountText, itemComponents.number, itemComponents.counts, itemComponents.text);
//         }
//     }

//     let sortedNumbers = sortObject(itemsCountText.items);
//     let sortedText = sortObject(itemsCountText.text);

//     return { items: sortedNumbers, text: sortedText };
// }

// function addItem(itemsCountText, item, count, text) {
//     if (item in itemsCountText.items) {
//         itemsCountText.items[item] += count;
//     } else {
//         itemsCountText.items[item] = count;
//     }
//     if (text !== null) {
//         itemsCountText.text[item] = text;
//     }
// }

// // returns [number=X, counts=Y, text="Z"]
// function splitItemToComponents(item) {
//     // let item = "3(7;texxxt)";
//     let leftBracket = item.indexOf('('),
//         rightBracket = item.indexOf(')'), // трябва да търси отзад напред, ако има (2;текст(ощетекст))
//         number = parseInt(item),
//         counts = 1,
//         text = null;

//     if (isNaN(number)) {
//         if (leftBracket > -1) {
//             number = item.substring(0, leftBracket);
//         } else {
//             number = item;
//         }
//     }

//     if (leftBracket > -1) { // and rigthBracket > -1 to be sure...
//         let additionalText = item.substring(leftBracket + 1, rightBracket);
//         let semiColon = item.indexOf(';');

//         if (semiColon > -1) { // има разделяне на бройка и текст
//             counts = parseInt(item.substring(leftBracket + 1, semiColon));
//             text = item.substring(semiColon + 1, rightBracket);
//         }        else { // има само бройка или само текст
//             let isTxtTmp = parseInt(additionalText);
//             if (isNaN(isTxtTmp)) { // текст
//                 text = additionalText;
//             }            else { // брой
//                 counts = isTxtTmp;
//             }
//         }
//     }
//     return { 'number': number, 'counts': counts, 'text': text };
// }

// function sortObject(o) {
//     return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
// }

// function isNumber(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }
////////////////////---------------------------- original code of reorganizeData (^)


// function createViewAsArray(collections, appendText) {
//     var resultArr = [];

//     for (let i = 0; i < collections.length; i++) {
//         let tempObj = {};
//         let row = collections[i];
//         tempObj.id = row.id;
//         tempObj.make = row.make;
//         tempObj.serie = row.serie;
//         tempObj.margins = row.margins;

//         let itemsCountText = convertStrToObj(row.items);
//         let result = '';

//         for (var key in itemsCountText.items) {
//             let firstAppend = true;
//             let count = itemsCountText.items[key];

//             if (appendText) {
//                 result += (itemsCountText.text[key] ? key + '(' + itemsCountText.text[key] + ')' : key) + ',';
//             } else {
//                 result += key + ',';
//             }

//             firstAppend = false;

//             while (count > 1) {
//                 if (appendText && firstAppend) {
//                     result += (itemsCountText.text[key] ? key + '(' + itemsCountText.text[key] + ')' : key) + ',';
//                 } else {
//                     result += key + ',';
//                 }

//                 count--;
//             }
//         }
//         tempObj.items = result.substr(0, result.length - 1);
//         resultArr.push(tempObj);
//     }
//     return resultArr;
// }

// function collapse(itemsCountText) {
//     let resultString = '';
//     console.log('itemsCountText: ' + JSON.stringify(itemsCountText));

//     for (var key in itemsCountText.items) {
//         resultString += key;
//         let count = itemsCountText.items[key];
//         if ((count > 1) && (itemsCountText.text[key]))
//             {resultString += '(' + count + ';' + itemsCountText.text[key] + ')';}
//         else if (count > 1) resultString = '(' + count + ')';
//         else if (itemsCountText.text[key]) resultString += '(' + itemsCountText.text[key] + ')';
//         else resultString += ',';
//     }
//     return resultString.substr(0, -1);
// }

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// function _compactResult(itemsCountText) {
//     let onlyNumbers = Object.keys(itemsCountText.items);

//     var i = 0,
//         res = '',
//         iMax = Object.keys(itemsCountText.items).length;

//     while (i < iMax) {
//         let j = 1;

//         while (/* (i+j < iMax) && */ (onlyNumbers[i + j - 1] == onlyNumbers[i + j] - 1)
//             && (itemsCountText.items[onlyNumbers[i + j - 1]] == 1)
//             && (!itemsCountText.text[onlyNumbers[i + j - 1]])) {
//             j++;
//         }

//         if ((itemsCountText.text[onlyNumbers[i + j - 1]] ||
//             itemsCountText.items[onlyNumbers[i + j - 1]] > 1) &&
//             j > 1) {
//             j--;// номерът с коментар да не е в интервала х-у, а да е отделен със запетая
//         }

//         if (j > 2) res += onlyNumbers[i] + '-' + onlyNumbers[i + j - 1];
//         else if (j == 2) res += onlyNumbers[i] + ',' + onlyNumbers[i + j - 1];
//         else res += onlyNumbers[i + j - 1];

//         if ((itemsCountText.text[onlyNumbers[i + j - 1]]) && (itemsCountText.items[onlyNumbers[i + j - 1]] > 1)) {	// бройка и коментар
//             res += '(' + itemsCountText.items[onlyNumbers[i + j - 1]] + ';' + itemsCountText.text[onlyNumbers[i + j - 1]] + ')';
//         } else if (itemsCountText.items[onlyNumbers[i + j - 1]] > 1) {	// само бройка
//             res += '(' + itemsCountText.items[onlyNumbers[i + j - 1]] + ')';
//         } else if (itemsCountText.text[onlyNumbers[i + j - 1]]) {	// само коментар
//             res += '(' + itemsCountText.text[onlyNumbers[i + j - 1]] + ')';
//         }
//         res += ',';
//         i += j;
//     }
//     return res.slice(0, -1);// премахва последната запетайка
// }

/* function shortList(arrayInput) {
 var i = 0,
 res = "",
 iMax = arrayInput.length;
 //res += arrayInput[i];
 while (i < iMax) {
 var j = 1;
 while (/* (i+j < iMax) && * / (arrayInput[i + j - 1] == arrayInput[i + j] - 1)) {
 j++;
 }
 if (j > 2) res += arrayInput[i] + "-" + arrayInput[i + j - 1]
 else if (j == 2) res += arrayInput[i] + "," + arrayInput[i + j - 1]
 else res += arrayInput[i + j - 1];
 res += ",";
 //Logger.log(">i=%s, j=%s : res=%s",i, j, res);
 i += j;
 }
 return res.slice(0, -1);
 }
 function isEmptyObject(obj) {
 for (var k in obj)
 if (obj.hasOwnProperty(k))
 return false;
 return true;
 } */
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
