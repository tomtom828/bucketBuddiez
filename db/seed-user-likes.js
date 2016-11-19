// NOTE: This file is used to create seeded associations between users and their likes.
// It can be called from the command line
// If you followed the README, then you can disregard this file.


// Sequelize Dependency
var models = require('../models'); 

// Extracts the sequelize connection from the models object
var sequelizeConnection = models.sequelize;

// Sync the tables (this creates the "likes" tables)
sequelizeConnection.sync()

// After the sync, seed the assocations (they do not exist until the sync is done)
.then(function(){


  // ------------ Seed the country-likes ------------

  // User 1
  models.Users.findOne({
    where: {
      id: 1
    }
  }).then(function(user){
    user.addCountry([189, 188, 156, 118, 48]);
  });


  // User 2
  models.Users.findOne({
    where: {
      id: 2
    }
  }).then(function(user){
    user.addCountry([189, 188, 159, 119, 48]);
  });



  // ------------ Seed the state-likes ------------

  // User 1
  models.Users.findOne({
    where: {
      id: 1
    }
  }).then(function(user){
    user.addState([6, 21, 43, 19, 5]);
  });


  // User 2
  models.Users.findOne({
    where: {
      id: 2
    }
  }).then(function(user){
    user.addState([6, 47, 43, 9, 5]);
  });



  // ------------ Seed the city-likes ------------

  // User 1
  models.Users.findOne({
    where: {
      id: 1
    }
  }).then(function(user){
    user.addCity([189, 188, 156, 118, 48]);
  });


  // User 2
  models.Users.findOne({
    where: {
      id: 2
    }
  }).then(function(user){
    user.addCity([189, 188, 159, 119, 48]);
  });

})