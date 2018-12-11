var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Remove server identification
app.use(function (req, res, next) {
  res.removeHeader('X-Powered-By');
  next();
});

// Only server public static files
app.use(express.static('public'))

// Anything else just redirects to the index page
app.use(function(req, res, next) {
  res.redirect("/");
});

module.exports = app;
