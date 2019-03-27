var express = require('express');
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
    secret: 'unican@2019',
    resave: true,
    saveUninitialized: true
}));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./node_modules/jquery/dist/'))
app.use(express.static('./node_modules/socket.io-client/dist'))
app.use(express.static('./node_modules/bootstrap/dist/'))
app.use(express.static('./node_modules/angular/'))
app.use(express.static('./public/'))

app.use('/', require('./routers/main'));

module.exports = app;