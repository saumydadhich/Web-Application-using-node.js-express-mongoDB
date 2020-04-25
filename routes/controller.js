

const express = require('express');
const route = express.Router();

route.get('/', function (req, res) {
    res.render('index.ejs', { session: req.session.theUser });
})


route.get('/about', function (req, res) {
    res.render('about.ejs', { session: req.session.theUser });
})


route.get('/contact', function (req, res) {
    res.render('contact.ejs', { session: req.session.theUser });
})


route.get('/login', function (req, res) {
        res.render('login.ejs', { session: req.session.theUser, failure: "", errorMessage: "" });

})

route.get('/signup', function (req, res){
        res.render('signup.ejs', { session: req.session.theUser });
})

route.get('/*', function (req, res) {
    res.render('index.ejs', { session: req.session.theUser });
})

module.exports = route;
