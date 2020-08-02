var express = require('express');
var exphbs  = require('express-handlebars');
const { createPreferences } = require('./client/mercado-pago');

var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    const url = `${req.protocol}://${req.get("Host")}`;
    const { title, price, img } = req.query;
    createPreferences(title, price, img, url);
    res.render('detail', req.query);
});

app.get('/failure', function (req, res) {
    res.render('failure');
});

app.get('/pending', function (req, res) {
    res.render('pending');
});

app.get('/success', function (req, res) {
    res.render('success', req.query);
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(process.env.PORT || 3000)