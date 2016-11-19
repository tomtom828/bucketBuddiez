// Node Dependencies
var express = require('express');
var router = express.Router();
var models = require('../models'); // Pulls out the Models


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
  models.Countries.findAll({
    order: [['countryName', 'ASC']]
  }).then(function(data){

    // Pass the returned data into a Handlebars object
    var hbsObject = { countries: data };

    // Render *addPlaces* template with *countries*
    //res.render('addPlaces', hbsObject);
    res.json(hbsObject);

  });

});


// User Sees All States in Database (DOM Render)
router.get('/view/states', function (req, res){

  // Query Database for all States
  models.States.findAll({
    order: [['stateName', 'ASC']]
  }).then(function(data){

    // Pass the returned data into a Handlebars object
    var hbsObject = { states: data };

    // Render *addPlaces* template with *states*
    //res.render('addPlaces', hbsObject);
    res.json(hbsObject);

  });

});


// User Sees All Cities in Database (DOM Render)
router.get('/view/cities', function (req, res){

  // Query Database for all Cities
  models.Cities.findAll({
    order: [['cityName', 'ASC']]
  }).then(function(data){

    // Pass the returned data into a Handlebars object
    var hbsObject = { cities: data };

    // Render *addPlaces* template with *cities*
    // res.render('addPlaces', hbsObject);
    res.json(hbsObject);
  });

});


// User Sees All Bucket List entries in the Database (DOM Render)
router.get('/view/bucketlist/:userId', function(req, res){

  // Query Database for all the user's liked countries (associated via the "___likes" tables)
  models.Users.findAll({
    where: {
      id: req.params.userId // OR req.body.userId for FORM ACTION
    },
    include: [models.Countries, models.States, models.Cities],
    // order: [[models.Countries.countryName, 'ASC'],[models.States.stateName, 'ASC'],[models.Cities.cityName, 'ASC']]
  }).then(function(data){

    // Pass the returned data into a Handlebars object
    var hbsObject = { bucketlist: data };

    // Render *addPlaces* template with *states*
    //res.render('viewAccount', hbsObject);
    res.json(hbsObject);

  });

});

// ----------------------------------------------------



// POST/API Routes for Database changes
// ----------------------------------------------------

// Create a new User (FROM ACTION)
router.post('/create/user', function (req, res){

  // Insert a new user to Users Table
  models.Users.create(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      facebookId: req.body.facebookId
    }
  ).then(function(){
    // Redirect to index page
    res.redirect('/index');
  });

});



// Add/Remove a Country from Bucket List (API)
router.get('/:action/country/:userId/:countryId', function(req, res){

  // Determine if add or remove
  var action = req.params.action;

  // (add) a user like
  if(action == 'add'){

    // Insert a new country like
    models.Users.findOne({
      where: {
        id: req.params.userId
      }
    }).then(function(user){
      user.addCountry(req.params.countryId)
      .then(function(data){
        res.json(data);
        // Redirect to country page ?
        // res.redirect('/view/countries');
      });
    });

  }
  // (remove) a user like
  else if(action == 'remove'){

    // Delete a country like
    models.Users.findOne({
      where: {
        id: req.params.userId
      }
    }).then(function(user){
      user.removeCountry(req.params.countryId)
      .then(function(data){
        res.json(data);
        // Redirect to bucket list page ?
        // res.redirect('/view/bucketlist');
      });
    });

  }
  // Bad route
  else{
    // Redirect to index
    res.redirect('index');
  }


});


// Add/Remove a State from Bucket List (API)
router.get('/:action/state/:userId/:stateId', function(req, res){

  // Determine if add or remove
  var action = req.params.action;

  // (add) a user like
  if(action == 'add'){

    // Insert a new state like
    models.Users.findOne({
      where: {
        id: req.params.userId
      }
    }).then(function(user){
      user.addState(req.params.stateId)
      .then(function(data){
        res.json(data);
        // Redirect to states page ?
        // res.redirect('/view/states');
      });
    });

  }
  // (remove) a user like
  else if(action == 'remove'){

    // Delete a state like
    models.Users.findOne({
      where: {
        id: req.params.userId
      }
    }).then(function(user){
      user.removeState(req.params.stateId)
      .then(function(data){
        res.json(data);
        // Redirect to bucket list page ?
        // res.redirect('/view/bucketlist');
      });
    });

  }
  // Bad route
  else{
    // Redirect to index
    res.redirect('index');
  }

});


// Add/Remove a City from Bucket List
router.get('/:action/city/:userId/:cityId', function(req, res){

  // Determine if add or remove
  var action = req.params.action;

  // (add) a user like
  if(action == 'add'){

    // Insert a new city like
    models.Users.findOne({
      where: {
        id: req.params.userId
      }
    }).then(function(user){
      user.addCity(req.params.cityId)
      .then(function(data){
        res.json(data);
        // Redirect to states page ?
        // res.redirect('/view/cities');
      });
    });

  }
  // (remove) a user like
  else if(action == 'remove'){

    // Delete a city like
    models.Users.findOne({
      where: {
        id: req.params.userId
      }
    }).then(function(user){
      user.removeCity(req.params.cityId)
      .then(function(data){
        res.json(data);
        // Redirect to bucket list page ?
        // res.redirect('/view/bucketlist');
      });
    });

  }
  // Bad route
  else{
    // Redirect to index
    res.redirect('index');
  }

});


// ----------------------------------------------------


// Export routes
module.exports = router;