// Node Dependencies
var express = require('express');
var domRouter = express.Router();
var models = require('../models'); // Pulls out the Models
var path = require('path');
var passport = require("passport");



// PASSPORT JS SESSION FUNCTIONS
// ----------------------------------------------------

// Global Variable to Store User Session (Express would not keep it persistent)
// var USER_SESSION = null;

// Sign in User
// function signInUser(req, res, error, user, info){
//   if(error) { res.redirect('/login'); } // return res.status(500).json(error);
//   if(!user) { res.redirect('/login');} // return res.status(401).json(info.message);

//   // Set the session to global variable
//   // USER_SESSION = user;
//   // console.log(USER_SESSION);

// console.log(user)

// req.logIn(user, function (err) {
//   if (err) {
//       return next(err);
//   }
//       // return res.redirect('/main/');
//       res.redirect('/view/bucketlist');
// });

  // Render Bucklist
 // res.redirect('/view/bucketlist');
//}

// Require User Session (to protect the routes)
function isUser(req, res, next){
  // check if the user is logged in (using our Global variable work around)
  if(!req.user){
    console.log('*******no user found************')
    req.session.messages = "You need to login to view this page";
    res.redirect('/login');
  }
  else{
    console.log('*********miracle**********')
    next();
  }
  
}



// PUBLIC ROUTES (No User Auth Needed)
// ----------------------------------------------------

// Index Home Page Render
domRouter.get('/', function (req, res){
  res.render('index');
});


// Sign up Page (DOM Render)
domRouter.get('/signup', function (req, res){
  res.render('signup');
});


// Login Page (DOM Render)
domRouter.get('/login', function (req, res){
  res.render('login');
});



// LOGIN, LOGOUT, & SIGN-UP ROUTES
// ----------------------------------------------------
domRouter.post('/user/login', function(req, res, next) {
  // passport.authenticate('local', function(error, user, info) {
  //   signInUser(req, res, error, user, info);
  // })(req, res, next);
  passport.authenticate('local', function (err, user, info) {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.redirect('/login');
      }
          req.logIn(user, function (err) {
              if (err) {
                  return next(err);
              }
              // Manually save session before redirect. See bug https://github.com/expressjs/session/pull/69
           // req.session.save(function(){
                // res.redirect('/view/bucketlist');
                console.log('----as-d---- saved seesion --------')
                res.redirect('/view/bucketlist');
           // });
                  //return res.redirect('/view/bucketlist');
          });
  })(req, res, next);
});


domRouter.post('/user/signup', function(req, res, next){
  console.log(req.body.username, req.body.password);
  passport.authenticate('local-signup', function(error, user, info) {
    signInUser(req, res, error, user, info);
  })(req, res, next);
});

domRouter.get('/user/logout', function(req, res) {
  req.session.destroy();

  // Remove the session to global variable
  // USER_SESSION = null;

  // Redirect to Homepage
  res.redirect('/');
});




// SECURE ROUTES (Require a Login Session)
// ----------------------------------------------------
// User Sees All Bucket List entries in the Database (DOM Render)
domRouter.get('/view/bucketlist', isUser, function(req, res){
console.log('xxxxxxxxxxxxxxxx' + user.id)
  // Query Database for all the user's liked countries (associated via the "___likes" tables)
  models.Users.findAll({
    where: {
      id: user.id // Pulled from our global session variable
    },
    include: [models.Countries, models.States, models.Cities],
    // order: [[models.Countries.countryName, 'ASC'],[models.States.stateName, 'ASC'],[models.Cities.cityName, 'ASC']]
  }).then(function(data){

    // Pass the returned data into a Handlebars object
    var hbsObject = { bucketlist: data };

    // Render porfolio page
    res.render('viewAccount', hbsObject);

  });

});


// User Sees All Countries in Database that they can add (DOM Render)
domRouter.get('/view/countries', isUser, function (req, res){

  // Find all Countries tied to the current user (so we can exclude them later)
  models.Countries.findAll({
    include: [{
      model: models.Users,
      where: {id: USER_SESSION.id} // Pulled from our global session variable
    }]
  }).then(function(excludeData){

      // Get Ids of all the countries the user has (so we can exclude them)
      var excludeTheseIds = [];
      for(var i=0; i<excludeData.length; i++){
        excludeTheseIds.push(excludeData[i].id);
      }
      console.log(excludeTheseIds)

      // Find all Countries in DB (including the ones the user alreay has)
      models.Countries.findAll({}).then(function(allData){

        // Get Ids of all entries in DB
        var allIds = [];
        for(var i=0; i<allData.length; i++){
          allIds.push(allData[i].id);
        }

        // Find all Ids that the user does NOT have by comparing the arrays 
        // This has to be done b/c Sequelize has no easy exclude multiple Ids feature
        var displayTheseIds = [];
        for(var i=0; i < allIds.length; i++){
          var pushToUser = true;
          for(var j=0; j < excludeTheseIds.length; j++){
            // Do not add any ids that the user already has
            if(allIds[i] == excludeTheseIds[j]){
              pushToUser = false;
            }
          }
          // If the user does not have the id, push it to the dispay array
          if(pushToUser){
            displayTheseIds.push(allIds[i]);
          }
        }
        console.log(displayTheseIds)

        // Finally, get all countries that are unique to the user and display them to the DOM
        models.Countries.findAll({
          order: [['countryName', 'ASC']],
          where: {id: displayTheseIds}
        }).then(function(data){

          // Pass the returned data into a Handlebars object
          var hbsObject = { 
            user: USER_SESSION.id, // Pulled from our global session variable,
            countries: data 
          };

          // Render *addPlaces* template with *countries*
          res.render('addCountries', hbsObject);
          // res.json(hbsObject)
      });

    });

  });

});


// User Sees All States in Database (DOM Render)
domRouter.get('/view/states', isUser, function (req, res){

  // Find all States tied to the current user (so we can exclude them later)
  models.States.findAll({
    include: [{
      model: models.Users,
      where: {id: USER_SESSION.id} // Pulled from our global session variable
    }]
  }).then(function(excludeData){

      // Get Ids of all the states the user has (so we can exclude them)
      var excludeTheseIds = [];
      for(var i=0; i<excludeData.length; i++){
        excludeTheseIds.push(excludeData[i].id);
      }
      console.log(excludeTheseIds)

      // Find all States in DB (including the ones the user alreay has)
      models.States.findAll({}).then(function(allData){

        // Get Ids of all entries in DB
        var allIds = [];
        for(var i=0; i<allData.length; i++){
          allIds.push(allData[i].id);
        }

        // Find all Ids that the user does NOT have by comparing the arrays 
        // This has to be done b/c Sequelize has no easy exclude multiple Ids feature
        var displayTheseIds = [];
        for(var i=0; i < allIds.length; i++){
          var pushToUser = true;
          for(var j=0; j < excludeTheseIds.length; j++){
            // Do not add any ids that the user already has
            if(allIds[i] == excludeTheseIds[j]){
              pushToUser = false;
            }
          }
          // If the user does not have the id, push it to the dispay array
          if(pushToUser){
            displayTheseIds.push(allIds[i]);
          }
        }
        console.log(displayTheseIds)

        // Finally, get all states that are unique to the user and display them to the DOM
        models.States.findAll({
          order: [['stateName', 'ASC']],
          where: {id: displayTheseIds}
        }).then(function(data){

          // Pass the returned data into a Handlebars object
          var hbsObject = { 
            user: USER_SESSION.id, // Pulled from our global session variable
            states: data 
          };

          // Render *addPlaces* template with *countries*
          res.render('addStates', hbsObject);

      });

    });

  });

});


// User Sees All Cities in Database (DOM Render)
domRouter.get('/view/cities', isUser, function (req, res){

  // Find all Cities tied to the current user (so we can exclude them later)
  models.Cities.findAll({
    include: [{
      model: models.Users,
      where: {id: USER_SESSION.id} // Pulled from our global session variable
    }]
  }).then(function(excludeData){

      // Get Ids of all the states the user has (so we can exclude them)
      var excludeTheseIds = [];
      for(var i=0; i<excludeData.length; i++){
        excludeTheseIds.push(excludeData[i].id);
      }
      console.log(excludeTheseIds)

      // Find all States in DB (including the ones the user alreay has)
      models.Cities.findAll({}).then(function(allData){

        // Get Ids of all entries in DB
        var allIds = [];
        for(var i=0; i<allData.length; i++){
          allIds.push(allData[i].id);
        }

        // Find all Ids that the user does NOT have by comparing the arrays 
        // This has to be done b/c Sequelize has no easy exclude multiple Ids feature
        var displayTheseIds = [];
        for(var i=0; i < allIds.length; i++){
          var pushToUser = true;
          for(var j=0; j < excludeTheseIds.length; j++){
            // Do not add any ids that the user already has
            if(allIds[i] == excludeTheseIds[j]){
              pushToUser = false;
            }
          }
          // If the user does not have the id, push it to the dispay array
          if(pushToUser){
            displayTheseIds.push(allIds[i]);
          }
        }
        console.log(displayTheseIds)

        // Finally, get all cities that are unique to the user and display them to the DOM
        models.Cities.findAll({
          order: [['cityName', 'ASC']],
          where: {id: displayTheseIds}
        }).then(function(data){

          // Pass the returned data into a Handlebars object
          var hbsObject = { 
            user: USER_SESSION.id, // Pulled from our global session variable
            cities: data 
          };

          // Render *addPlaces* template with *countries*
          res.render('addCities', hbsObject);

      });

    });

  });

});


// ----------------------------------------------------


// Export routes
module.exports = domRouter;
