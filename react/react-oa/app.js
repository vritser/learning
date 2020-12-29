require('babel-core/register');
require("babel-polyfill");
var express = require('express');
// import express from 'express';
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config.babel');

const db = require('./api/db/mongoose').default();

var msgs = require('./api/routes/msgs');
var users = require('./api/routes/users');
var work = require('./api/routes/work');

var app = express();
const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

const server = require('./ws');

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/msgs', msgs);
app.use('/users', users);
app.use('/work', work);

app.get('/design',(req,res) => {
  res.sendFile(path.join(__dirname,'design.html'))
})
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.on('request', app);
server.listen(3000, () => {
  console.log('listening on 3000');
})
// module.exports = app;
// exports.app = app;
// exports.server = server;

