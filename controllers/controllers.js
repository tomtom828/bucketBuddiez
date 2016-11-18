// Node Dependencies
var express = require('express');
var router = express.Router();
var models = require('../models'); // Pulls out the Burger Models


// Extracts the sequelize connection from the models object
// var sequelizeConnection = models.sequelize;

// Sync the tables
// sequelizeConnection.sync();


// GET Routes to render pages
// ----------------------------------------------------

// Index Redirect
router.get('/', function (req, res){
  res.redirect('/index');
});


// Index Page (DOM Render)
router.get('/index', function (req, res){

  // Render hompage (no handlebars)
  res.render('index');

});


// User Sees All Countries in Database (DOM Render)
router.get('/view/countries', function (req, res){

  // Query Database for all Countries
  models.Countries.findAll({}).then(function(data){

    // Pass the returned data into a Handlebars object
    var hbsObject = { countries: data };

    // Render *addPlaces* template with *countries*
    res.render('addPlaces', hbsObject);

  });

});


// User Sees All States in Database (DOM Render)
router.get('/view/states', function (req, res){

  // Query Database for all States
  models.States.findAll({}).then(function(data){

    // Pass the returned data into a Handlebars object
    var hbsObject = { states: data };

    // Render *addPlaces* template with *states*
    res.render('addPlaces', hbsObject);
    
  });

});


// User Sees All Cities in Database (DOM Render)
router.get('/view/cities', function (req, res){

  // Query Database for all States
  models.Cities.findAll({}).then(function(data){

    // Pass the returned data into a Handlebars object
    var hbsObject = { cities: data };

    // Render *addPlaces* template with *cities*
    res.render('addPlaces', hbsObject);
    
  });

});


// User Sees All Bucket List entries in the Database (DOM Render)
router.get('/view/bucketlist/:userId', function(req, res){

  // Query Database for all Countries, States, Cities belonging to the user
  models.Users.findAll({
    where: {
      id: userId
    },
    include: [models.Countries, models.States, models.Cities]
  }).then(function(data){

    // Pass the returned data into a Handlebars object
    var hbsObject = { bucketlist: data };

    // Render *addPlaces* template with *states*
    res.render('viewAccount', hbsObject);
    
  });

});

// ----------------------------------------------------




// POST Routes for Database changes
// ----------------------------------------------------

// Create a new User
router.post('/create/user/:name/:facebook', function (req, res){

  // Insert a new user to Users Table

  // Redirect to index page
  res.redirect('/index');

});



// Add/Remove a Country from Bucket List
router.post('/:action/country/:userId/:countryId', function(req, res){

  // (add) Relate Country Id to User
    // Redirect to country page
    res.redirect('/view/countries');

  // (remove) Remove Country Id from User
    // Redirect to bucket list page
    res.redirect('/view/bucketlist');

});


// Add/Remove a State from Bucket List
router.post('/:action/state/:userId/:stateId', function(req, res){

  // (add) Relate State Id to User
    // Redirect to state page
    res.redirect('/view/states');

  // (remove) Remove State Id from User
    // Redirect to bucket list page
    res.redirect('/view/bucketlist');

});


// Add/Remove a City from Bucket List
router.post('/:action/city/:userId/:cityId', function(req, res){

  // (add) Relate City Id to User
    // Redirect to city page
    res.redirect('/view/cities');

  // (remove) Remove City Id from User
    // Redirect to bucket list page
    res.redirect('/view/bucketlist');

});


// ----------------------------------------------------


// Export routes
module.exports = router;