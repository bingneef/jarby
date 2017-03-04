// SETUP correct routing for local exports
require('app-module-path').addPath(__dirname);
const path = require('path');

// DEPENDENCIES
const
  http          = require('http'),
  express       = require('express'),
  cors          = require('cors'),
  bodyParser    = require('body-parser'),
  morgan        = require('morgan'),
  passport      = require('./oauth'),
  constants     = require('config/constants');

const
  OauthRoutes           = require('routes').OauthRoutes,
  AuthenticationRoutes  = require('routes').AuthenticationRoutes,
  RecipeRoutes          = require('routes').RecipeRoutes,
  dbConnection          = require('databaseConnection');

// Only do locus for non-production.
if (process.env.NODE_ENV != 'production') {
  global.locus = require('locus');
} else {
  global.locus = undefined;
}

app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, '/views'));

app.use(passport.initialize());

app.use(OauthRoutes);
app.use('/api/v1', [AuthenticationRoutes, RecipeRoutes]);

// Check if the server is running
app.use('/alive', (req, res) => {
  res.send({alive: true});
})

port = process.env.PORT || 5000;

httpServer = http.createServer(app);

// Add sockets
require('./socket')
httpServer.listen(port, '0.0.0.0');


console.log("Server running. Listening on port " + port + ".");
console.log("Version: " + constants.version);
module.exports = app
