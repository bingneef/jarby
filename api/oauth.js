var passport = require('passport')
  , GitHubStrategy = require('passport-github').Strategy
  , GoogleStrategy = require( 'passport-google-oauth2' ).Strategy
  , User = require('./models').User
  , env = require('./config/env');

/*
/ 1: Check if a oauth exists
/ 2: If Array, pick the first (Sequelize can return an array..)
/ 3: Get the user of the oAuth and return user
/ 4: If no user found, findOrCreate by email
/ 5: Add oAUth to user and return user
*/
var getUserOfToken = (type, identifier, email, done) => {
  Oauth.findOrCreate({
    where: {
      identifier: identifier,
      type: type
    }
  }).then((oauth) => {
    if (Array.isArray(oauth)) {
      oauth = oauth[0]
    }

    oauth.getUser().then((user) => {
      if (user) {
        return done(null, user);
      }
      User.findOrCreate({
        where: {
          email: email
        },
        defaults: {
          active: true
        }
      }).then((user, err) => {
        if (Array.isArray(user)) {
          user = user[0]
        }

        user.addOauth(oauth).then((user) => {
          return done(null, user);
        }).catch(() => done('Error', null));
      }).catch(() => done('Error', null));
    }).catch(() => done('Error', null));
  }).catch(() => done('Error', null));
}
passport.use(new GitHubStrategy({
    clientID:     env.oauth.github.clientID,
    clientSecret: env.oauth.github.clientSecret,
    callbackURL:  env.serverOrigin + '/auth/github/callback',
    scope: [ 'user:email' ]
  },
  function(accessToken, refreshToken, profile, done) {
    getUserOfToken('github', profile.id, profile.emails[0].value, done)
  }
));
 
passport.use(new GoogleStrategy({
    clientID:     env.oauth.google.clientID,
    clientSecret: env.oauth.google.clientSecret,
    callbackURL:  env.serverOrigin + '/auth/google/callback',
    scope: [ 'https://www.googleapis.com/auth/userinfo.email' ]
  },
  function(accessToken, refreshToken, profile, done) {
    getUserOfToken('google', profile.id, profile.email, done)
  }
));

module.exports = passport
