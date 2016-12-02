// Node Dependencies
var SessionUser = "HACKY FIX";

var express = require('express');
var domRouter = express.Router();
var models = require('../models'); // Pulls out the Models
var path = require('path');
var passport = require("passport");

function signInUser(req, res, error, user, info){
  if(error) { return res.status(500).json(error); }
  if(!user) { return res.status(401).json(info.message); }
  //console.log(user);
  SessionUser = user
  //console.log(userId);
  res.redirect('/view/bucketlist/' + 5);
}

// function requireAuth(req, res, next){
//   console.log('hit');
//   // check if the user is logged in
//   if(!req.isAuthenticated()){
//     req.session.messages = "You need to login to view this page";
//     res.redirect('/login');
//   }
//   next();
// }

function isUser(req, res, next){
  console.log('also hit');
  // check if the user is logged in
  if(SessionUser == "HACKY FIX"){
    req.session.messages = "You need to login to view this page";
    res.redirect('/login');
  }
  else{
    next();
  }
}

// GET Routes to render pages
// ----------------------------------------------------

// Index Redirect
domRouter.get('/', function (req, res){
  // res.sendFile(path.join(__dirname, '/../public/index.html'));


  // conditions = {
  //   footerStatus: false
  // }
  // res.render('index', {data: conditions});


  // console.log(req.user);
  res.render('index');

});

// Login Page (DOM Render)
domRouter.get('/login', function (req, res){

  // Render sign up page (no handlebars)
  // res.sendFile(path.join(__dirname, '/../public/login.html'));
  res.render('login');
  // res.render('login');

});

domRouter.post('/user/login', function(req, res, next) {
  passport.authenticate('local', function(error, user, info) {
    signInUser(req, res, error, user, info);
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
  res.redirect('/');
});

// Facebook
// domRouter.get('/login/facebook', passport.authenticate('facebook'));

// domRouter.get('/login/facebook/callback',
//   passport.authenticate('facebook', {failureRedirect: '/login' }),

//   function(req, res) {
//     res.redirect("/view/bucketlist/2");
// });


// User Sees All Bucket List entries in the Database (DOM Render)
domRouter.get('/view/bucketlist/:userId', isUser,
  function(req, res){
console.log('jelloooooo111111')
console.log(SessionUser)
console.log('-----------')
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

    // Render porfolio page
    res.render('viewAccount', hbsObject);
    // res.json(hbsObject)

  });

});



// Sign up Page (DOM Render)
domRouter.get('/signup', function (req, res){

  // Render sign up page (no handlebars)
  // res.sendFile(path.join(__dirname, '/../public/signup.html'));
  res.render('signup');
  // res.render('signup');

});

// User Sees All Countries in Database that they can add (DOM Render)
domRouter.get('/view/countries/:userId', function (req, res){

  // Find all Countries tied to the current user (so we can exclude them later)
  models.Countries.findAll({
    include: [{
      model: models.Users,
      where: {id: req.params.userId}
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
            user: req.params.userId,
            countries: data 
          };

          // Render *addPlaces* template with *countries*
          res.render('addCountries', hbsObject);

      });

    });

  });

});


// User Sees All States in Database (DOM Render)
domRouter.get('/view/states/:userId', function (req, res){

  // Find all States tied to the current user (so we can exclude them later)
  models.States.findAll({
    include: [{
      model: models.Users,
      where: {id: req.params.userId}
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
            user: req.params.userId,
            states: data 
          };

          // Render *addPlaces* template with *countries*
          res.render('addStates', hbsObject);

      });

    });

  });

});


// User Sees All Cities in Database (DOM Render)
domRouter.get('/view/cities/:userId', function (req, res){

  // Find all Cities tied to the current user (so we can exclude them later)
  models.Cities.findAll({
    include: [{
      model: models.Users,
      where: {id: req.params.userId}
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
            user: req.params.userId,
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