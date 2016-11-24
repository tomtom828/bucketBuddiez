// Node Dependencies
var express = require('express');
var crudRouter = express.Router();
var models = require('../models'); // Pulls out the Models


// POST/API Routes for Database changes
// ----------------------------------------------------

// Create a new User (FROM ACTION, i.e. POST)
crudRouter.post('/create/user', function (req, res){

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
crudRouter.get('/:action/country/:userId/:countryId', function(req, res){

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
crudRouter.get('/:action/state/:userId/:stateId', function(req, res){

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
crudRouter.get('/:action/city/:userId/:cityId', function(req, res){

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
module.exports = crudRouter;