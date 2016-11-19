// Node Dependencies
var express = require('express');
var domRouter = express.Router();
var models = require('../models'); // Pulls out the Models


// GET Routes to render pages
// ----------------------------------------------------

// Index Redirect
domRouter.get('/', function (req, res){
  res.redirect('/index');
});


// Index Page (DOM Render)
domRouter.get('/index', function (req, res){

  // Render hompage (no handlebars)
  res.render('index');

});


// User Sees All Countries in Database (DOM Render)
domRouter.get('/view/countries', function (req, res){

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
domRouter.get('/view/states', function (req, res){

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
domRouter.get('/view/cities', function (req, res){

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
domRouter.get('/view/bucketlist/:userId', function(req, res){

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


// Export routes
module.exports = domRouter;