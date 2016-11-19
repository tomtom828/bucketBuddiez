// Node Dependencies
var express = require('express');
var fbRouter = express.Router();
// var models = require('../models'); 
var path = require('path');


// Create routes
// ----------------------------------------------------


// Login Page
fbRouter.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/login.html'));
});

// ----------------------------------------------------


// Export routes
module.exports = fbRouter;