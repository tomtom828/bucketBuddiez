// Node Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

// Set up Express
var app = express();

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