// Node Dependencies
var express = require('express');
var domRouter = express.Router();
var models = require('../models'); // Pulls out the Models
var path = require('path');
var passport = require("passport");

// GET Routes to render pages
// ----------------------------------------------------

// Index Redirect
domRouter.get('/', function (req, res){
  res.redirect('/index');
});


// Index Page (DOM Render)
domRouter.get('/index', function (req, res){

  // Render hompage (no handlebars)
  res.sendFile(path.join(__dirname, '/../public/index.html'));

});



// Login Page (DOM Render)
domRouter.get('/login', loginPost, function (req, res){

  // Render sign up page (no handlebars)
  res.sendFile(path.join(__dirname, '/../public/login.html'));

  if(req.user){
    // already logged in
    res.redirect('/');
  } else {
    // not logged in, show the login form, remember to pass the message
    // for displaying when error happens
    res.render('login', { message: req.session.messages });
    // and then remember to clear the message
    req.session.messages = null;
  }
});

function loginPost(req, res, next) {
  // ask passport to authenticate
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      // if error happens
      return next(err);
    }

    if (!user) {
      // if authentication fail, get the error message that we set
      // from previous (info.message) step, assign it into to
      // req.session and redirect to the login page again to display
      req.session.messages = info.message;
      return res.redirect('/login');
    }

    // if everything's OK
    req.logIn(user, function(err) {
      if (err) {
        req.session.messages = "Error";
        return next(err);
      }

      // set the message
      req.session.messages = "Login successfully";
      return res.redirect('/');
    });

  })(req, res, next);
}

domRouter.get('/logout', function(req, res){
  if(req.isAuthenticated()){
    req.logout();
    req.session.messages = req.i18n.__("Log out successfully");
  }
    res.redirect('/');
})


// Facebook
domRouter.get('/login/facebook', passport.authenticate('facebook'));

domRouter.get('/login/facebook/callback',
  passport.authenticate('facebook', {failureRedirect: '/login' }),

  function(req, res) {
    res.redirect("/view/bucketlist/2");
});


// User Sees All Bucket List entries in the Database (DOM Render)
domRouter.get('/view/bucketlist/:userId',
  require("connect-ensure-login").ensureLoggedIn(),
  function(req, res){

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






// Sign up Page (DOM Render)
domRouter.get('/signup', function (req, res){

  // Render sign up page (no handlebars)
  res.sendFile(path.join(__dirname, '/../public/signup.html'));

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
    res.render('addCountries', hbsObject);
    // res.json(hbsObject);

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

    // Render *addStates* template with *states*
    res.render('addStates', hbsObject);
    // res.json(hbsObject);

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

    // Render *addCities* template with *cities*
    res.render('addCities', hbsObject);
    // res.json(hbsObject);
  });

});


// ----------------------------------------------------


// Export routes
module.exports = domRouter;