'use strict'

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const session = require('express-session');

const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5033;

// Start app with express
const app = express();

// MongoDB(Atlas) Config
const db = 'mongodb+srv://' + process.env.MONGO_DB_USERNAME + ':' + process.env.MONGO_DB_PASSWORD + '@' + process.env.MONGO_DB_CLUSTERNAME + '?retryWrites=true&w=majority';

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false}));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
);

// Set public folder to be served
app.use(express.static('public'));

app.use('/css', express.static(__dirname + '/public/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

app.use('/js', express.static(__dirname + '/node_modules/popper.js/dist/umd')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS

// Serve public pages
app.use('/', require('./routes/index'));

//serve 404 page
app.use('*', (req, res, next) => res.render("404"));
/*
app.use(function (req, res, next) {
    res.render("404");
    //res.status(404).send("Sorry can't find that!")
})
*/

// Listen to server
app.listen(PORT, console.log(`Server Started on Port ${PORT}`));

// find today's time
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

// ping during work days
if ((today.getHours() >= 9 && today.getHours() <= 24) || (today.getHours() <= 1))
{
    var http = require("http");
    console.log("currently true, hour is at: " + today.getHours() + ", minutes: " + today.getMinutes());
    setInterval(function() {
        http.get("http://mata33.herokuapp.com");
    }, 1800000); // every 30 minutes (every second = 1000)
} else {
    console.log("currently false, hour is at: " + today.getHours() + ", minutes: " + today.getMinutes());
}