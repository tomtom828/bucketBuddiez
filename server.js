// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;

var passport = require('passport');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// Bring in the models
var models = require('./models');

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));
// app.use(express.static('public'));

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: true})); // get information from html forms

// Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// Sync models
models.sequelize.sync();

// required for passport
require('./config/passport')(app);
app.use(session({ secret: 'mysecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// Import DOM controller
var domRouter = require('./controllers/dom-controllers.js');
app.use('/', domRouter);

// Import CRUD controller
var crudRouter = require('./controllers/crud-controllers.js');
app.use('/', crudRouter);

// Import FIND controller (for matching users)
var findRouter = require('./controllers/find-controllers.js');
app.use('/', findRouter);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);