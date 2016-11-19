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
  console.log(req.params.userId)
  console.log(req.params.countryId)

  // (add) Relate Country Id to User
  if(action == 'add'){

    // Insert a new country like
    models.CountryLikes.create(
      {
        userId: req.params.userId,
        countryId: req.params.countryId
      }
      ).then(function(data){
        res.json(data);
      });

  }
  // (remove) Remove Country Id from User
  else if(action == 'remove'){

  }
  // Bad route
  else{
    // Redirect to index
    res.redirect('index');
  }

  
    // Redirect to country page
    //res.redirect('/view/countries');

  
    // Redirect to bucket list page
    // res.redirect('/view/bucketlist');

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