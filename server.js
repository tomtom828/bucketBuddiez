// Node Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var passport = require("passport");
var facebookStrategy = require("passport-facebook").Strategy;
var localStrategy = require('passport-local').Strategy;

// Passport localauthenticating information
passport.use(new localStrategy({
    //setting field name here
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    /* get the username and password from the input arguments of the function */

    // query the user from the database
    // don't care the way I query from database, you can use
    // any method to query the user from database
    Users.find( { where: {email: email}} )
      .success(function(user){

        if(!user)
          // if the user is not exist
          return done(null, false, {message: "The user does not exist"});
        else if(!hashing.compare(password, user.password))
          // if password does not match
          return done(null, false, {message: "Wrong password"});
        else
          // if everything is OK, return null as the error
          // and the authenticated user
          return done(null, user);

      })
      .error(function(err){
        return done(err);
      });
  }
));

// maintaining authentication state in session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  // query the current user from database
  User.find(id)
    .success(function(user){
        done(null, user);
    }).error(function(err){
        done(new Error('User ' + id + ' does not exist'));
    });
});

// Passport / Facebook Authentication Information
passport.use(new facebookStrategy({
  clientID: process.env.CLIENT_ID || "581851128669439",
  clientSecret: process.env.CLIENT_SECRET || "55ebf99283ab1293d73de27d5c9cfe56",
  callbackURL: "http://localhost:3000/login/facebook/callback"
},
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// Bring in the models
var models = require('./models')

// Sync models
models.sequelize.sync();

// Set up Express
var app = express();

// Incorporated a variety of Express packages.
app.use(require("morgan")("combined"));
app.use(require("cookie-parser")());
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("express-session")({ secret: "keyboard cat", resave: true, saveUninitialized: true }));

// Here we start our Passport process and initiate the storage of sessions (i.e. closing browser maintains user)
app.use(passport.initialize());
app.use(passport.session());

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));
// app.use(express.static('public'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// ------------------------ Routes/Controllers ------------------------

// Import DOM controller
var domRouter = require('./controllers/dom-controllers.js');
app.use('/', domRouter);

// Import CRUD controller
var crudRouter = require('./controllers/crud-controllers.js');
app.use('/', crudRouter);

// Import FIND controller (for matching users)
var findRouter = require('./controllers/find-controllers.js');
app.use('/', findRouter);


// --------------------------------------------------------------------

// Open Server
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listening on port ' + port);
});