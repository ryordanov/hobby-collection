/* let collections = [
 {'Turbo', 'rare', '1-50', '21,22,45,50'},
 {'Turbo', 'thick&thin', '51-540', '51(2),52-54,55(2;*),56(2;*),57(2;*),58,59,60(2;*),61-70,71(3),72,73(3),74-80,81(2),82-84,85(2),86(2),87,88(2;*),89,90(3),91-142,143(2),144,145,146(2),147-149,150(2),151-163,164(2),165-173,174(2),175-179,180(3),181(2;*),182-206,207(2),208-234,235(2;*),236-274,275(2),276,277(2),278-293,294(2),295-300,301(2),302-310,311(2),312-391,392(2),393-396,397(2),398(2),399,400(2),401-444,445(2;*),446-455,456(2),457-459,460(2;*),461-540'},
 {'Bi-bib', 'коли', '1-168', '1,2(2),4-6,7(*),8-13,14(2),15-23,24(2;*),26-39,40(две разл. коли - имам жълто),41-49,50(2;скъсана),51,52,53(*),54,55,57,58,59(2),60(два вида:една с липсващ текст),61-66,67(2),69,71-75,77-81,83,84(2),87-91,92(2),93,94(*),95,96,99,100,101(черна рядък и имам червено/синя лента),102(2;черно рядко и имам жълто),103-105,106(2),107(2),108,111,112(2),113(3),114,115(2),116(2),117-120,123(2),124(2),125(2),126(3),127,128,129(2),130(2),131(бял фон на текста рядък и имам жълт),132(2),135,136(3;жълт рядък и имам син фон),137(2),138(2),139(3),140-142,143(3;*),144(син рядък и имам жълт),147-150,151(2),152,153,154(2),155(*),156,159-161,162(3),163(2),164(2;*),165,166,167(2),168(2)'},
 {'Rock & Bubble', 'карти', '', '♣3,6,8,10,J,Q,K,A,♦3,4,6,6,6,7,9,10,10,J,Q,K,A,♥2,3,4,5,8,9,9,10,J,J,Q,K,A,♠3,4,4,9,10,J,Q,A,Joker червен с Еди Мърфи'}
 ]; */

//var gum = require('../utilities/gum').seedGumInserts();
var gum = require('../utilities/gum');
var wholeCollection = gum.wholeCollection();
var expandedGumInserts = gum.expand(gum.getItemList(0));
console.log('Original: ' + wholeCollection[0].items);
console.log('Expanded: ' + expandedGumInserts);

module.exports = {
    index : (req, res) => {
        res.render('home/index', {title: 'Картинки от дъвки', collections: wholeCollection});
    },
    about : (req, res) => {
        res.render('home/about');
    }
};
