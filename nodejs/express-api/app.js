/// <reference path="./typings/node/node.d.ts" />
/// <reference path="./typings/express/express.d.ts" />

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var redisStore = require('connect-redis')(session);
var ejs = require('ejs');
var flash = require('connect-flash');
var cors = require('./config/cors');

var app = express();

// require('babel-core/register');
// require("babel-polyfill");

// var db = require('./config/mongoose')();
// var users = require('./routes/users');
// import users from './routes/users';
var index = require('./routes')
//跨域设置
app.use(cors);
// view engine setup
app.engine('html',ejs.__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
app.use(flash());
app.use(session({
  secret:'vritser'
}));
// {
//   store:new redisStore({
//     port:6379,
//     host:'localhost',
//     db:0
//   }),
//   secret:'vritser',
//   cookie: { maxAge: 60000 }
// }

// app.use('/', users);
app.use('/',index)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
