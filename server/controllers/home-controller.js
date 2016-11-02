let series = [
    'Turbo 1-50',
    'Turbo 51-120',
    'Bi-bib'
];
module.exports = {
    index : (req, res) => {
        res.render('home/index', { title: series[0], series: series });
    },
    about : (req, res) => {
        res.render('home/about');
    }
};
