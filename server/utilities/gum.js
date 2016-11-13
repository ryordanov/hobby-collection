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
var collections = [
    {id: 0, make: 'Turbo', serie: 'rare', margins: '1-50', items: '1-5,6(2;*),7(2),10(*),15-20'},
    {id: 1, make: 'Turbo', serie: 'rare', margins: '51-540', items: '51,56,99(*),102'},
    {id: 2, make: 'Bi-bib', serie: 'коли', margins: '1-168', items: '21(*),22,45(3;скъсана),50,167,168'}
];

module.exports = {
    wholeCollection: () => {
        return collections;
    },
    getItemList: (row) => {
        return collections[row].items
    },
    expand: (items) => {
        return expand(items).numbers;
    }
};

function expand(items) {
    let onlyNumbers = [],                                    // 1,2,2,3,3,3,3,3,3,7,7,9,10,11,12
        additionalText = {},                                 // {7=>"texxt"}
        NumbersAndInfo = {numbers: [], text: {}};          //[[numbers], {additional text} ]

    items = items.split(',');

    for (let i = 0; i < items.length; i++) {
        let item = items[i],
            m = item.match(/^(\d+)[-](\d+)$/);

        if (m != null) {
            let iMin = parseInt(m[1]),
                iMax = parseInt(m[2]);

            for (let j = iMin; j <= iMax; j++)
                onlyNumbers.push(j);
        }
        else //ако има (text) след числото - се вади в нов асоциативен масив/обект
        if (item.length) {                   //ако няма тире между запетайките, но има все пак нещо
            let itemComponents = splitItemToComponents(item);   // [number, counts=1, text=""]
            for (let k = 1; k <= itemComponents.counts; k++)
                onlyNumbers.push(itemComponents.number);
            if (itemComponents.text != "")
                additionalText[itemComponents.number] = itemComponents.text
        }
    }

    onlyNumbers.sort(function (a, b) {//сортиране на масива
        return a - b;
    });

    NumbersAndInfo = makeUniqueNumbersAndText(onlyNumbers, additionalText);
    return NumbersAndInfo;// ({numbers:[1, 2, 3, 6, 7, 8, 9, 10, 11, 12], text:{1:"(probe)", 2:"(2)", 3:"(6)", 7:"(3;texxt)"}})

}

//returns [number=X, counts=Y, text="Z"]
function splitItemToComponents(item) {
    //let item = "3(7;texxxt)";
    let leftBracket = item.indexOf("("),
        rightBracket = item.indexOf(")"),//трябва да търси отзад напред, ако има (2;текст(ощетекст))
        number = parseInt(item),
        counts = 1,
        text = "";

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

//преброява наново номерата (може да са били разбъркани и бройката да не е актуална) и ъпдейтва [бройката; текста]
function makeUniqueNumbersAndText(onlyNumbers, additionalText) {
    let updatedCount = {},
        result = {numbers: [], text: {}};

    /*  onlyNumbers.sort(function (a, b) {//сортиране на масива
     return a - b;
     }); */

    for (let i = 0; i < onlyNumbers.length; i++) {
        if (onlyNumbers[i] in updatedCount) {
            updatedCount[onlyNumbers[i]] += 1;
        } else {
            result.numbers.push(onlyNumbers[i]);
            updatedCount[onlyNumbers[i]] = 1;
        }
    }
    console.log('updatedCount: ' + JSON.stringify(updatedCount));
    for (let i = 0; i < result.numbers.length; i++) {
        let count = updatedCount[result.numbers[i]];
        if ((count > 1 ) && (additionalText[result.numbers[i]]))
            result.text[result.numbers[i]] = "(" + count + ";" + additionalText[result.numbers[i]] + ")"
        else if (count > 1) result.text[result.numbers[i]] = "(" + count + ")"
        else if (additionalText[result.numbers[i]]) result.text[result.numbers[i]] = "(" + additionalText[result.numbers[i]] + ")";
    }
    return result;
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