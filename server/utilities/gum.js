/* 
 let requredValidationMessage = '{PATH} is required';

 let gumSchema = mongoose.Schema({
 id: { type: String, required: requredValidationMessage, unique: true},
 make: { type: String, required: requredValidationMessage },
 serie: { type: String },
 margins: { type: String },
 items: { type: String },
 });
 let Gum = mongoose.model('Gum', gumSchema);
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
 } */
//https://www.npmjs.com/package/google-spreadsheet
var collections = [
    {id: 0, make: 'Turbo', serie: 'rare', margins: '1-50', items: '21,22,45,50'},
    {
        id: 1,
        make: 'Turbo',
        serie: '51-540',
        margins: '51-540',
        items: '51(2),52-54,55(2;*),56(2;*),57(2;*),58,59,60(2;*),61-70,71(3),72,73(3),74-80,81(2),82-84,85(2),86(2),87,88(2;*),89,90(3),91-142,143(2),144,145,146(2),147-149,150(2),151-163,164(2),165-173,174(2),175-179,180(3),181(2;*),182-206,207(2),208-234,235(2;*),236-274,275(2),276,277(2),278-293,294(2),295-300,301(2),302-310,311(2),312-391,392(2),393-396,397(2),398(2),399,400(2),401-444,445(2;*),446-455,456(2),457-459,460(2;*),461-540'
    },
    {id: 2, make: 'Bi-bib', serie: 'коли', margins: '1-168', items: '21(*),22,45(3;скъсана),50,167,168'},
    {id: 3, make: 'Lazer', serie: 'center aligned', margins: '1-70', items: '1-9,11,12,13,14,20-69'},
    {
        id: 4,
        make: 'Идеал',
        serie: 'животни',
        margins: 'няколко',
        items: 'вълк,слон(2),елен(2),мечка,лъв(2;*),тигър,маймуна,жирафА,жираф,носорог,кенгуру'
    }
];

module.exports = {
    wholeCollection: () => {
        return collections;
    },
    getItemList: (row) => {
        return collections[row].items;
    },
    getAllExpandIdentifiers: () => {
        var resultArr = [];

        for (let i = 0; i < collections.length; i++) {
            let tempObj = {};
            let row = collections[i];
            tempObj.id = row.id;
            tempObj.make = row.make;
            tempObj.serie = row.serie;
            tempObj.margins = row.margins;

            let itemsCountText = convertStrToObj(row.items);		//цикъл да вкарам и бройките в списъка
            let result = '';

            //to make call to getRowOnlyIdentifiers() instead of redefine code
            for (var key in itemsCountText.items) {
                let count = itemsCountText.items[key];
                result += key + ',';
                while (count > 1) {
                    result += key + ',';
                    count--;
                }
            }
            tempObj.items = result.substr(0, result.length - 1);
            //the upper code must be reduced by replacing it with function call
            resultArr.push(tempObj);
        }
        return resultArr;
    }, getRowOnlyIdentifiers: (row) => {
        let itemsCountText = convertStrToObj(collections[row].items);		//цикъл да вкарам и бройките в списъка
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
    }
};

function collapse(itemsCountText) {
    let resultString = '';
    console.log('itemsCountText: ' + JSON.stringify(itemsCountText));

    for (var key in itemsCountText.items) {
        resultString += key;
        let count = itemsCountText.items[key];
        if ((count > 1 ) && (itemsCountText.text[key]))
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

    if (isEmptyObject(itemsCountText.text)) {
        return shortList(onlyNumbers)
    }
    else {
        var i = 0,
            res = "",
            iMax = Object.keys(itemsCountText.items).length;

        while (i < iMax) {
            var j = 1;

            while (/* (i+j < iMax) && */ (onlyNumbers[i + j - 1] == onlyNumbers[i + j] - 1)
            && (itemsCountText.items[onlyNumbers[i + j - 1]] == 1)
            && (!itemsCountText.text[onlyNumbers[i + j - 1]])) {
                j++;
            }

            if (itemsCountText.text[onlyNumbers[i + j - 1]] && j > 1) j--;//номерът с коментар да не е в интервала х-у, а да е отделен със запетая

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
}

function shortList(arrayInput) {
    var i = 0,
        res = "",
        iMax = arrayInput.length;

    //res += arrayInput[i];
    while (i < iMax) {
        var j = 1;

        while (/* (i+j < iMax) && */ (arrayInput[i + j - 1] == arrayInput[i + j] - 1)) {
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
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function convertStrToObj(items) {
    let itemsCountText = {items: {}, text: {}};         //items:{1:4, 3:1, 5:1, 6:3}, text:{6:'*', 10:'sometext'}

    items = items.split(',');

    if (isNumber(items[0].substr(0, 1))) {
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

    return {items: sortedNumbers, text: sortedText}
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
    return {"number": number, "counts": counts, "text": text};
}

/* 
 //преброява наново номерата (може да са били разбъркани и бройката да не е актуална) и ъпдейтва [бройката; текста]
 function makeUniqueNumbersAndText(onlyNumbers, additionalText)  {
 let updatedCount = {},
 result = {numbers : [], text : {}};

 for (let i = 0; i < onlyNumbers.length; i++) {
 if (onlyNumbers[i] in updatedCount) {
 updatedCount[onlyNumbers[i]] += 1;
 } else {
 result.numbers.push(onlyNumbers[i]);
 updatedCount[onlyNumbers[i]] = 1;
 }
 }

 for (let i = 0; i < result.numbers.length; i++) {
 let count = updatedCount[result.numbers[i]];
 if ( (count > 1 ) && (additionalText[result.numbers[i]]) )
 result.text[result.numbers[i]] = "(" + count + ";" + additionalText[result.numbers[i]] + ")"
 else
 if (count > 1 ) result.text[result.numbers[i]] = "(" + count + ")"
 else if (additionalText[result.numbers[i]]) result.text[result.numbers[i]] = "(" + additionalText[result.numbers[i]] + ")";
 }
 return result;
 }
 */
//http://stackoverflow.com/questions/5467129/sort-javascript-object-by-key
function sortObject(o) {
    return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {});
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}