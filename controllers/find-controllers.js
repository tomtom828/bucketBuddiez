// Node Dependencies
var express = require('express');
var findRouter = express.Router();
var models = require('../models'); // Pulls out the Models


// More GET routes... to see ALL users who want to vist the same country
// These responses need to be passed to Facebook API for more parsing
// ----------------------------------------------------

// Find all users with same country likes (API)
findRouter.get('/find-all-users/country/:countryId', function(req, res){

    models.Countries.findAll({
      where: {
        id: req.params.countryId
      },
      include: [models.Users],
    }).then(function(data){

        res.json(data);

    });

});


// Find all users with same state likes (API)
findRouter.get('/find-all-users/state/:stateId', function(req, res){

    models.States.findAll({
      where: {
        id: req.params.stateId
      },
      include: [models.Users],
    }).then(function(data){

        res.json(data);

    });

});



// Find all users with same city likes (API)
findRouter.get('/find-all-users/city/:cityId', function(req, res){

    models.Cities.findAll({
      where: {
        id: req.params.cityId
      },
      include: [models.Users],
    }).then(function(data){

        res.json(data);

    });

});



// ----------------------------------------------------


// Export routes
module.exports = findRouter;