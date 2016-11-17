// Node Dependencies
var express = require('express');
var router = express.Router();
var models = require('../models'); // Pulls out the Burger Models


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


// ----------------------------------------------------


// Export routes
module.exports = router;