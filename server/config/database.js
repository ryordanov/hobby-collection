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

/*
var collections = [
    { id: 0, make: 'Turbo', serie: 'rare[1-50]', margins: '1-50', items: '21,22,45,50' }, {
        id: 1,
        make: 'Turbo',
        serie: '[51-120]',
        margins: '51-120',
        items: '51(2),52-54,55(2;*),56(2;*),57(2;*),58,59,60(2;*),61-70,71(3),72,73(3),74-80,81(2),82-84,85(2),86(2),87,88(2;*),89,90(3),91-120'
    }, {
        id: 2,
        make: 'Turbo',
        serie: '[121-190]',
        margins: '121-190',
        items: '121-142,143(2),144,145,146(2),147-149,150(2),151-163,164(2),165-173,174(2),175-179,180(3),181(2;*),182-190'
    }, {
        id: 3,
        make: 'Turbo',
        serie: '[191-260]',
        margins: '191-260',
        items: '191-206,207(2),208-234,235(2;*),236-260'
    }, {
        id: 4,
        make: 'Turbo',
        serie: 'thick&thin[261-330]',
        margins: '261-330',
        items: '261-274,275(2),276,277(2),278-293,294(2),295-300,301(2),302-310,311(2),312-330'
    }, {
        id: 5,
        make: 'Turbo',
        serie: 'super[331-400]',
        margins: '331-400',
        items: '331-391,392(2),393-396,397(2),398(2),399,400(2)'
    }, {
        id: 6,
        make: 'Turbo',
        serie: 'super[401-470]',
        margins: '401-470',
        items: '401-444,445(2;*),446-455,456(2),457-459,460(2;*),461-470'
    }, { id: 7, make: 'Turbo', serie: 'super[471-540]', margins: '471-540', items: '471-540' }, {
        id: 8,
        make: 'Turbo sport',
        serie: 'blue&violet[1-70]',
        margins: '1-70',
        items: '1-25,26(2),27(2),28-39,40(2),41-62,63(2),64-69,70(2)'
    }, {
        id: 9,
        make: 'Turbo sport',
        serie: 'blue&violet[71-140]',
        margins: '71-140',
        items: '71-89,91,93-98,100-103,105-107,108(надраскан гръб),109,110,112-117,120-122,124-137,139,140'
    }, {
        id: 10,
        make: 'Turbo sport',
        serie: 'blue&violet[141-210]',
        margins: '141-210',
        items: '141-176,177(2),178-181,182(2),183-194,195(2),196-209,210(2)'
    }, {
        id: 11,
        make: 'Turbo classic',
        serie: 'with&without classic[1-70]',
        margins: '1-70',
        items: '1(c),2(c),3(c),4,5(c),6-8,9(c),10-16,17(c),18-26,27(2;*),28(c),29-31,33,34(c),35-37,38(2),39-51,52(c),53,54,55(c),56,57(c),58(c),59,60,61(c),62,63(c),64-66,67(2),68-70'
    }, {
        id: 12,
        make: 'Turbo classic',
        serie: 'with&without classic[71-140]',
        margins: '71-140',
        items: '72,77,80-82,86,94,95,99,100,103-106,113,116,120,125,128,131,133,134'
    }, {
        id: 13,
        make: 'Turbo 2000',
        serie: '[71-140]',
        margins: '71-140',
        items: '81(Jaguar XK8R),86(Maserati Auge),107(Dodge interpidESX2),123(Porsche 911 carrera),128(Peugeot 20)'
    }, {
        id: 14,
        make: 'Turbo sport 2000',
        serie: '[211-280]',
        margins: '211-280',
        items: '228(Chevrolet Montecarlo 9),271(Renault twingo 01 red),272(Stola monotipo 05 sport),275(Sport Elise)'
    }, {
        id: 15,
        make: 'Turbo 2014',
        serie: '[1-160]',
        margins: '1-160',
        items: '23(Ford mondeo 1997),55(Audi S5 cabriolet 1968)'
    }, {
        id: 16,
        make: 'Bi-bib',
        serie: 'cars[1-168]',
        margins: '1-168',
        items: '1,2(2),4-6,7(*),8-13,14(2),15-23,24(2;*),26-39,40(две разл. коли - имам жълто),41-49,50(2;скъсана),51,52,53(*),54,55,57,58,59(2),60(два вида:една с липсващ текст),61-66,67(2),69,71-75,77-81,83,84(2),87-91,92(2),93,94(*),95,96,99,100,101(черна рядък и имам червено/синя лента),102(2;черно рядко и имам жълто),103-105,106(2),107(2),108,111,112(2),113(3),114,115(2),116(2),117-120,123(2),124(2),125(2),126(3),127,128,129(2),130(2),131(бял фон на текста рядък и имам жълт),132(2),135,136(3;жълт рядък и имам син фон),137(2),138(2),139(3),140-142,143(3;*),144(син рядък и имам жълт),147-150,151(2),152,153,154(2),155(*),156,159-161,162(3),163(2),164(2;*),165,166,167(2),168(2)'
    }, {
        id: 17,
        make: 'Oto moto',
        serie: '[1-100]',
        margins: '1-100',
        items: '1-4,5(3),6-22,24(2),25-30,32-38,39(2),40(2),41,42(3;*),43,44(2),45(2),46(2),47,48,49(2),50(3),51(2),52-56,59(2),60(2),63,64,66-68,70-72,73(3),74-84,85(3),86(2),87(2),88,89,90(2),91-100'
    }, {
        id: 18,
        make: 'Lazer',
        serie: 'left aligned text[1-70]',
        margins: '1-70',
        items: '1-4,5(2;*),8,9,10(2),11-22,24-27,29,30,32,33,36-39,41-67,68(2),69,70(2)'
    }, {
        id: 19,
        make: 'Lazer',
        serie: 'center aligned text[1-70]',
        margins: '1-70',
        items: '1,2,5,8,10,11,20,21,45,53,55,56,58,60,67,68'
    }, {
        id: 20,
        make: 'Love is…',
        serie: 'black Love Is 2 serie 1993[1-101]',
        margins: '1-101',
        items: '1-4,7,10,14,17,20,24,25,27(легло с цветя),34,35,39(2),40(2),41,49(без номер),52,53,55(два броя от две серии),59,62,65,66,69,70,72,73(разл. серия?),75,82-87,89-91,93,96,98,99'
    }, { id: 21, make: 'Love is…', serie: 'Love is...black hearts.[1-102]', margins: '1-102', items: '7' }, {
        id: 22,
        make: 'Love is…',
        serie: 'some red heart[]',
        margins: '',
        items: ''
    }, { id: 23, make: 'Ask melegi', serie: 'turkish Love is...[1-54]', margins: '1-54', items: '30' }, {
        id: 24,
        make: 'Bombibom',
        serie: '1 square[1-60]',
        margins: '1-60',
        items: '1(3),2-14,15(*),16-23,24(2),25,26,27(2),28(2),29-36,37(2),38-43,44(*),45-48,49(2),50,51(2),52(2),53(2),54,55(2),56-59,60(2)'
    }, {
        id: 25,
        make: 'Bombibom',
        serie: '2 rectangle white[1-90]',
        margins: '1-90',
        items: '1(2),2-5,6(2),7-14,15(2),16,17,18(2),19,21-24,25(2),26-28,29(2),30-32,33(Guattro),34-37,38(2),39(2),40-47,48(2),49,50(2),51-57,58(2),59,60(2),61,62(2),63,64(2),65-72,73(2),74,75(2),76,77(2),78(2),79(2),80,81(2),82,84(2),85-87,89(2),90'
    }, {
        id: 26,
        make: 'Bombibom',
        serie: '3 yellow with b[1-90]',
        margins: '1-90',
        items: '33(oldsmobile),36(porsche),37(jaguarXJSv12),38(Chrysler),80(nissan200SX)'
    }, { id: 27, make: 'Bombibom', serie: 'big yellow[1-70]', margins: '1-70', items: '' }, {
        id: 28,
        make: 'Bombibom',
        serie: 'big white[1-70]',
        margins: '1-70',
        items: '15(Toyota Celica 200 GTR)'
    }, {
        id: 29,
        make: 'Bombibom',
        serie: 'sport[1-99]',
        margins: '1-99',
        items: '5(Иосиф Ротарю /Румыния ФК Галатасарай)'
    }, { id: 30, make: 'Donald', serie: 'no numbers[103]', margins: '103', items: '' }, {
        id: 31,
        make: 'Guiness records',
        serie: '1990[1-40]',
        margins: '1-40',
        items: '7,13,16,19,23,36'
    }, {
        id: 32,
        make: 'Cola',
        serie: 'big[1-70]',
        margins: '1-70',
        items: '1-5,6(2),7(2),8(2),9(2),10(2),11(2),12(3),13(2),14(2),15(3),16,17(2),18(3),19(3),20,21(2),22,23(2),24,25,26(2),27-29,30(2),31(2),32(2),33,34,35(2),36-38,39(2),40,42,44,45,46(2;*),48,49,50(2),51,56,59,61,63(2;*),64,65,66(2),67,68(изрязана грешно при описанието),69'
    }, {
        id: 33,
        make: 'Cola',
        serie: 'small[1-70]',
        margins: '1-70',
        items: '48(Tombul Teyze),55(dArtagnan),65'
    }, {
        id: 34,
        make: 'Cola kent',
        serie: 'singers[unknown]',
        margins: 'unknown',
        items: '11(George Michael),39(Rick Springfield),45(Simon Le Bon)'
    }, {
        id: 35,
        make: 'Cin Cin',
        serie: 'Aquatic Life[1-97]',
        margins: '1-97',
        items: '35(Acanthaster planci),38(Kaya… Palinurus vulgaris),42(Dil Baligi)'
    }, {
        id: 36,
        make: 'Cin Cin',
        serie: 'Animals/Зверове[1-70]',
        margins: '1-70',
        items: '10(JohnstoneTimsahi),17(Tukan),22(Hippopotamus Amphibius),43(Bugdaycil kusu),98(Kirmizi Gagali Hornbill)'
    }, { id: 37, make: 'Cin Cin', serie: '3 friends red[1-96]', margins: '1-96', items: '89' }, {
        id: 38,
        make: 'Cin Cin',
        serie: '3-friends[1-100]',
        margins: '1-100',
        items: '3,17,22,26,30,39,41,43,47,49,69,91,92,98'
    }, {
        id: 39,
        make: 'Cin Cin',
        serie: 'not known[unknown]',
        margins: 'unknown',
        items: '110,116,118,120,121,123,141(2),145(2;*),159,170,174,186'
    }, { id: 40, make: 'Cin Cin', serie: 'Science Fiction[1-96]', margins: '1-96', items: '60,88,89' }, {
        id: 41,
        make: 'Minti',
        serie: 'actors[1-70]',
        margins: '1-70',
        items: '18,53,60,68'
    }, { id: 42, make: 'Minti', serie: '[71-140]', margins: '71-140', items: '117' }, {
        id: 43,
        make: 'Minti',
        serie: '[141-220]',
        margins: '141-220',
        items: '142-148,150-152,154-157,158(3),159,160(2),162-166,167(2),168-171,173,175-178,179(2),181,182,188,189,191,192(2),193-195,198,199,202,203,205,206,209,210,213,216'
    }, { id: 44, make: 'Minti', serie: 'actors[1-100]', margins: '1-100', items: '54,77' }, {
        id: 45,
        make: 'Minti',
        serie: 'blue minti[1-99]',
        margins: '1-99',
        items: '13(Bon Jovi)'
    }, {
        id: 46,
        make: 'Kobra',
        serie: 'black italic[1-100]',
        margins: '1-100',
        items: '6(*),14,39(2),50,71,72,74,86'
    }, { id: 47, make: 'TIPI TIP', serie: '[1-70]', margins: '1-70', items: '' }, {
        id: 48,
        make: 'TIPI TIP',
        serie: '[71-140]',
        margins: '71-140',
        items: ''
    }, { id: 49, make: 'TIPI TIP', serie: '[141-210]', margins: '141-210', items: '' }, {
        id: 50,
        make: 'TIPI TIP',
        serie: '[211-280]',
        margins: '211-280',
        items: ''
    }, { id: 51, make: 'TIPI TIP', serie: '[281-350]', margins: '281-350', items: '' }, {
        id: 52,
        make: 'TIPI TIP',
        serie: '[351-420]',
        margins: '351-420',
        items: '371'
    }, { id: 53, make: 'TIPI TIP', serie: '[421-490]', margins: '421-490', items: '438' }, {
        id: 54,
        make: 'TIPI TIP',
        serie: '[561-630]',
        margins: '561-630',
        items: '590,609'
    }, { id: 55, make: 'TIPI TIP', serie: '[631-700]', margins: '631-700', items: '692' }, {
        id: 56,
        make: 'TIPI TIP',
        serie: '[701-770]',
        margins: '701-770',
        items: '701-704,706,707,710-729,730(*),731-739,741-745,747(2),748(2),749,750(2),751-766,767(2),768-770'
    }, {
        id: 57,
        make: 'TIPI TIP',
        serie: '[771-870]',
        margins: '771-870',
        items: '774,779,789,812,825,839,867'
    }, { id: 58, make: 'TIPI TIP', serie: '[871-940]', margins: '871-940', items: '' }, {
        id: 59,
        make: 'TIPI TIP',
        serie: '[941-986]',
        margins: '941-986',
        items: ''
    }, { id: 60, make: 'TIPI TIP', serie: '[987-1051]', margins: '987-1051', items: '' }, {
        id: 61,
        make: 'unknown',
        serie: '[unknown]',
        margins: 'unknown',
        items: '22(Porsche 928)'
    }, {
        id: 62,
        make: 'Roben',
        serie: '[1-54]',
        margins: '1-54',
        items: '12,42,44(грешен номер при изрязването),49(грешен номер при изрязването)'
    }, { id: 63, make: 'Final 86', serie: 'red[1-60]', margins: '1-60', items: '' }, {
        id: 64,
        make: 'Flintstone',
        serie: '[unknown]',
        margins: 'unknown',
        items: '23,50'
    }, { id: 65, make: 'Kent super star', serie: '[unknown]', margins: 'unknown', items: '30(Zerrin Ozer)' }, {
        id: 66,
        make: 'Patbom',
        serie: '[1-80]',
        margins: '1-80',
        items: '39,57'
    }, {
        id: 67,
        make: 'Patbom',
        serie: '[81-160]',
        margins: '81-160',
        items: '125(скъсана),142,143,145,159(изрязана грешно с номер 158)'
    }, { id: 68, make: 'Pembo', serie: '[]', margins: '', items: '55,65,68,72' }, {
        id: 69,
        make: 'Rock & Bubble',
        serie: '[]',
        margins: '',
        items: 'Joker червен с Еди Мърфи,♠10,♠3,♠4(2),♠9,♠A,♠J,♠Q,♣10,♣3,♣6,♣8,♣A,♣J,♣K,♣Q,♥10,♥2,♥3,♥4,♥5,♥8,♥9(2),♥A,♥J(2),♥K,♥Q,♦10(2),♦3,♦4,♦6(3),♦7,♦9,♦A,♦J,♦K,♦Q'
    }, {
        id: 70,
        make: 'Идеал',
        serie: 'приказки[unknown]',
        margins: 'unknown',
        items: 'котаракът в чизми(2),пепеляшка(2),снежанка и 7те джуджета(3),червената шапчица'
    }, {
        id: 71,
        make: 'Идеал',
        serie: 'животни[unknown]',
        margins: 'unknown',
        items: 'вълк,елен(2),жираф,жирафА,кенгуру,лъв(2;*),маймуна,мечка,носорог,слон(2),тигър'
    }, {
        id: 72,
        make: 'Идеал',
        serie: 'коли[unknown]',
        margins: 'unknown',
        items: 'Alfa romeo 155 Q4,Audi 100 2.0 16V,Bugatti - 1930,Chrisler 70 - 1924,Fiat 8HP - 1901,Ford N - 1906,Honda Civic 1.6 VTi,Lancia `dalambda` - 1928,Mazerati ghibli,Mercedes 38/250 SS - 1932,Porsche 911,Porsche speedster,Rolls Royce - 1921,Scania - 1903(2)'
    }, {
        id: 73,
        make: 'Идеал НТО',
        serie: '[1-100]',
        margins: '1-100',
        items: '1,5(2;a),6,21,22,24(2;a),25-28,48,49,50(2;a),52,54,57,58(2;a),77,82'
    }, { id: 74, make: 'Списание "Дъга"', serie: '[1-42]', margins: '1-42', items: '1-40,42' }
];
*/

module.exports = (config) => {
    mongoose.connect(config.db, {
        useMongoClient: true
        // promiseLibrary: global.Promise
    });

    let db = mongoose.connection;

    db.once('open', (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Connected to "%s" database!', config.db.substr(config.db.indexOf('@') + 1, config.db.length));

        // var collection = db.collection("guminserts");
        // collection.find({id:3}).toArray(function (err, docs) {
        //    console.log(docs[0]);
        // });
    });
    db.on('error', err => console.log(err));

    return db;
};
