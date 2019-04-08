var express = require('express');
var app = express.Router();
var controller = require('../controllers/admin');
//var middleware = require('../middlewares/admin');

app.get('/', function (req, res) {
    var resp = req.session.resp;
    req.session.resp = null; 
    res.render('admin/login',{
        resp : resp
    });
});
app.get('/logout', function (req, res) {
    req.session.admin = null;
    res.redirect('/admin');
});
app.get('/dashboard', function (req, res, next) {
    if(!req.session.admin){
        res.redirect('/admin');
        return;
    }
    next();
},controller.dashboard);


app.post('/login',controller.login);

module.exports = app;