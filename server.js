var express = require('express');

// Configure
var app = require('./config/express')(express);
require('./config/passport')(app);
require('./config/routes')(app, express);

module.exports = app;
