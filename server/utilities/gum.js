//v100 - there are two options - 1) data from DB mongo to be taken only on server start and then local collection
//       to be updated; or 2) via callbacks on each page refresh the whole DB collection to be taken - this may
//       cause problem if the data is modified separately (with some DB manager for example) 

var mongoose = require('mongoose');

let requredValidationMessage = '{PATH} is required';
let gumSchema = new mongoose.Schema({
    id: { type: Number, required: requredValidationMessage, unique: true },
    make: { type: String, required: requredValidationMessage },
    serie: { type: String },
    margins: { type: String },
    items: { type: String },
});
var Gum = mongoose.model('Guminserts', gumSchema);

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

var collections = [];
Gum.find({}, function (err, gums) {
    if (err) console.log(err);

    collections = gums;
    console.log('Total number of items: ' + gums.length);

    //gums.forEach(function (gum) {
    //   console.log(gum);
    //});
})
    .sort('id');

function fetchData() {
    let query = Gum.find({}).sort('id');
    return query;
}

module.exports = {
    wholeCollection: () => {
        return collections;
    },
    getItemList: (row) => {
        return collections[row].items;
    },
    getAllExpandIdentifiers: () => {
        let arrOfObjects = createViewAsArray(collections, false);   //false to display only identifiers
        return arrOfObjects;
    },
    getAllExpandIdentifiersAndText: (callback) => {
        let arrOfObjects = createViewAsArray(collections, true);   //true to display also text
        return arrOfObjects;
        //v100.2:bottom lines will use async functions and callback to read the whole DB collection on page display
        // let query = fetchData();
        // query.exec(function(err, collections){
        //    let arrOfObjects = createViewAsArray(collections, true);   //true to display also text
        //    callback(err, arrOfObjects)
        // })
    },
    getRowOnlyIdentifiers: (row) => {
        let itemsCountText = convertStrToObj(collections[row].items);
        let result = '';

        for (var key in itemsCountText.items) {
            let count = itemsCountText.items[key];
            result += key + ',';
            while (count > 1) {
                result += key + ',';
                count--;
            }
        }
        return result.substr(0, result.length - 1);
    },
    getAllCollapsedItems: () => {
        var resultArr = [];

        for (let i = 0; i < collections.length; i++) {
            let tempObj = {};
            let row = collections[i];
            tempObj.id = row.id;
            tempObj.make = row.make;
            tempObj.serie = row.serie;
            tempObj.margins = row.margins;

            let itemsCountText = convertStrToObj(row.items);
            tempObj.items = _compactResult(itemsCountText);
            resultArr.push(tempObj);
        }
        return resultArr;
    },
    getRowCollapsedItems: (row) => {
        let itemsCountText = convertStrToObj(collections[row].items);

        return _compactResult(itemsCountText);
    },
    getItemsWithNotes: (row) => {
        let itemsCountText = convertStrToObj(collections[row].items);
        return JSON.stringify(itemsCountText.text);
    },
    /////////////// SET
    setItemsById: (row, updatedItems, callback) => {
        let intId = parseInt(row);

        let itemsCountText = convertStrToObj(updatedItems);
        let itemsForDB = _compactResult(itemsCountText);

        Gum.findOneAndUpdate({ "id": intId }, { $set: { "items": itemsForDB } }, { new: true, runValidators: true }, function (err, data) {
            if (err) {
                console.log("Something wrong when updating data!");
            }

            //v100.1 update global collections in order to avoid reading every time the collection from Mongo
            collections[intId].items = data.items;
            callback(err, { "id": data.id, "items": data.items });
        });
    }
};

function createViewAsArray(collections, appendText) {
    var resultArr = [];

    for (let i = 0; i < collections.length; i++) {
        let tempObj = {};
        let row = collections[i];
        tempObj.id = row.id;
        tempObj.make = row.make;
        tempObj.serie = row.serie;
        tempObj.margins = row.margins;

        let itemsCountText = convertStrToObj(row.items);
        let result = '';

        for (var key in itemsCountText.items) {
            let firstAppend = true;
            let count = itemsCountText.items[key];

            if (appendText) {
                result += (itemsCountText.text[key] ? key + '(' + itemsCountText.text[key] + ')' : key) + ',';
            } else {
                result += key + ',';
            }

            firstAppend = false;

            while (count > 1) {
                if (appendText && firstAppend) {
                    result += (itemsCountText.text[key] ? key + '(' + itemsCountText.text[key] + ')' : key) + ',';
                } else {
                    result += key + ',';
                }

                count--;
            }
        }
        tempObj.items = result.substr(0, result.length - 1);
        resultArr.push(tempObj);
    }
    return resultArr;
}

function collapse(itemsCountText) {
    let resultString = '';
    console.log('itemsCountText: ' + JSON.stringify(itemsCountText));

    for (var key in itemsCountText.items) {
        resultString += key;
        let count = itemsCountText.items[key];
        if ((count > 1) && (itemsCountText.text[key]))
            resultString += "(" + count + ";" + itemsCountText.text[key] + ")"
        else if (count > 1) resultString = "(" + count + ")"
        else if (itemsCountText.text[key]) resultString += "(" + itemsCountText.text[key] + ")"
        else resultString += ',';
    }
    return resultString.substr(0, -1);
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function _compactResult(itemsCountText) {
    let onlyNumbers = Object.keys(itemsCountText.items);

    var i = 0,
        res = "",
        iMax = Object.keys(itemsCountText.items).length;

    while (i < iMax) {
        let j = 1;

        while (/* (i+j < iMax) && */ (onlyNumbers[i + j - 1] == onlyNumbers[i + j] - 1)
            && (itemsCountText.items[onlyNumbers[i + j - 1]] == 1)
            && (!itemsCountText.text[onlyNumbers[i + j - 1]])) {
            j++;
        }

        if ((itemsCountText.text[onlyNumbers[i + j - 1]] ||
            itemsCountText.items[onlyNumbers[i + j - 1]] > 1) &&
            j > 1) {
            j--;//номерът с коментар да не е в интервала х-у, а да е отделен със запетая
        }

        if (j > 2) res += onlyNumbers[i] + "-" + onlyNumbers[i + j - 1]
        else if (j == 2) res += onlyNumbers[i] + "," + onlyNumbers[i + j - 1]
        else res += onlyNumbers[i + j - 1];

        if ((itemsCountText.text[onlyNumbers[i + j - 1]]) && (itemsCountText.items[onlyNumbers[i + j - 1]] > 1)) {	//бройка и коментар
            res += '(' + itemsCountText.items[onlyNumbers[i + j - 1]] + ';' + itemsCountText.text[onlyNumbers[i + j - 1]] + ')'
        } else if (itemsCountText.items[onlyNumbers[i + j - 1]] > 1) {	//само бройка
            res += '(' + itemsCountText.items[onlyNumbers[i + j - 1]] + ')'
        } else if (itemsCountText.text[onlyNumbers[i + j - 1]]) {	//само коментар
            res += '(' + itemsCountText.text[onlyNumbers[i + j - 1]] + ')'
        }
        res += ',';
        i += j;
    }
    return res.slice(0, -1)//премахва последната запетайка

}

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
 }*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function convertStrToObj(items) {
    let itemsCountText = { items: {}, text: {} };         //items:{1:4, 3:1, 5:1, 6:3}, text:{6:'*', 10:'sometext'}

    items = items.split(',');

    if (isNumber(items[0].substr(0, 1))) {      // to be replaced with REGEX one day!!! "1,3(7),4(txt),5-10,12(2;ttt)"
        for (let i = 0; i < items.length; i++) {
            let item = items[i],
                m = item.match(/^(\d+)[-](\d+)$/);

            if (m != null) {
                let iMin = parseInt(m[1]),
                    iMax = parseInt(m[2]);

                for (let j = iMin; j <= iMax; j++)
                    addItem(itemsCountText, j, 1, null);
            }
            else //ако има (text) след числото - се вади в нов асоциативен масив/обект
                if (item.length) {                   //ако няма тире между запетайките, но има все пак нещо
                    let itemComponents = splitItemToComponents(item);   // [number=51, counts=1, text=""]   "" or null
                    addItem(itemsCountText, itemComponents.number, itemComponents.counts, itemComponents.text);
                }
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let itemComponents = splitItemToComponents(item);   // [number=51, counts=1, text=""]   "" or null
            addItem(itemsCountText, itemComponents.number, itemComponents.counts, itemComponents.text);
        }
    }

    let sortedNumbers = sortObject(itemsCountText.items);
    let sortedText = sortObject(itemsCountText.text);

    return { items: sortedNumbers, text: sortedText }
}

function addItem(itemsCountText, item, count, text) {
    if (item in itemsCountText.items) {
        itemsCountText.items[item] += count;
    } else {
        itemsCountText.items[item] = count;
    }
    if (text !== null) {
        itemsCountText.text[item] = text;
    }
}

//returns [number=X, counts=Y, text="Z"]
function splitItemToComponents(item) {
    //let item = "3(7;texxxt)";
    let leftBracket = item.indexOf("("),
        rightBracket = item.indexOf(")"),//трябва да търси отзад напред, ако има (2;текст(ощетекст))
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

    if (leftBracket > -1) {//and rigthBracket > -1 to be sure...
        let additionalText = item.substring(leftBracket + 1, rightBracket);
        let semiColon = item.indexOf(";");

        if (semiColon > -1) {//има разделяне на бройка и текст
            counts = parseInt(item.substring(leftBracket + 1, semiColon));
            text = item.substring(semiColon + 1, rightBracket);
        }
        else {//има само бройка или само текст
            let isTxtTmp = parseInt(additionalText);
            if (isNaN(isTxtTmp)) {//текст
                text = additionalText;
            }
            else {//брой
                counts = isTxtTmp;
            }
        }
    }
    return { "number": number, "counts": counts, "text": text };
}

function sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
