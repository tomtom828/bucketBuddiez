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
    user.addCountry([10, 9, 12, 7, 1]);
  });


  // User 2
  models.Users.findOne({
    where: {
      id: 2
    }
  }).then(function(user){
    user.addCountry([10, 9, 2, 8, 1]);
  });


  // User 3
  models.Users.findOne({
    where: {
      id: 3
    }
  }).then(function(user){
    user.addCountry([1, 2, 3, 4, 5]);
  });


  // User 4
  models.Users.findOne({
    where: {
      id: 4
    }
  }).then(function(user){
    user.addCountry([6, 7, 8, 4, 1]);
  });



  // ------------ Seed the state-likes ------------

  // User 1
  models.Users.findOne({
    where: {
      id: 1
    }
  }).then(function(user){
    user.addState([10, 9, 2, 8, 1]);
  });


  // User 2
  models.Users.findOne({
    where: {
      id: 2
    }
  }).then(function(user){
    user.addState([10, 9, 2, 8, 1]);
  });


  // User 3
  models.Users.findOne({
    where: {
      id: 3
    }
  }).then(function(user){
    user.addState([1, 2, 3, 4, 5]);
  });


  // User 4
  models.Users.findOne({
    where: {
      id: 4
    }
  }).then(function(user){
    user.addState([6, 7, 8, 4, 1]);
  });



  // ------------ Seed the city-likes ------------

  // User 1
  models.Users.findOne({
    where: {
      id: 1
    }
  }).then(function(user){
    user.addCity([10, 9, 2, 8, 1]);
  });


  // User 2
  models.Users.findOne({
    where: {
      id: 2
    }
  }).then(function(user){
    user.addCity([10, 9, 2, 8, 1]);
  });


  // User 3
  models.Users.findOne({
    where: {
      id: 3
    }
  }).then(function(user){
    user.addCity([1, 2, 3, 4, 5]);
  });


  // User 4
  models.Users.findOne({
    where: {
      id: 4
    }
  }).then(function(user){
    user.addCity([6, 7, 8, 4, 1]);
  });


})