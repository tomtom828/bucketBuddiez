// Node Dependencies
var express = require('express');
var router = express.Router();
var models = require('../models'); // Pulls out the Burger Models
var path = require('path');


// Extracts the sequelize connection from the models object
// var sequelizeConnection = models.sequelize;

// Sync the tables
// sequelizeConnection.sync();


// Create routes
// ----------------------------------------------------

// Index Redirect
router.get('/', function (req, res) {
  res.redirect('/index');
});



// Index Page 
router.get('/index', function (req, res) {
  // Render something...
});


// Login Page
router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '/../public/login.html'));
});

// ----------------------------------------------------


// Export routes
module.exports = router;