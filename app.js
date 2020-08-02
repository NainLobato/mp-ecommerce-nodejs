var express = require('express');
const bodyParser = require('body-parser');
var exphbs  = require('express-handlebars');
const { createPreferences } = require('./client/mercado-pago');

var app = express();

app.use( bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
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

app.post("/checkout", async function (req, res) {
    const url = `${req.protocol}://${req.get("Host")}`;
    const { title, price, img } = req.body;
    const body = await createPreferences(title, price, img, url);
    console.log(`preference-id: ${body.id}`);
    res.redirect(body.init_point);
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

app.post("/notify", function (req, res) {
    console.log("Notification Webhook");
    console.log(req.body);
    res.status(200).send("OK");
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(process.env.PORT || 3000)