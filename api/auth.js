var passport = require('passport')
  , GitHubStrategy = require('passport-github2').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , GoogleStrategy = require( 'passport-google-oauth2' ).Strategy
  , User = require('./models').User
  , env = require('./config/env');

passport.use(new GitHubStrategy({
    clientID:     env.oauth.github.clientID,
    clientSecret: env.oauth.github.clientSecret,
    callbackURL: env.serverOrigin + '/auth/github/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({
      where: {
        email: profile.emails[0].value
      },
      defaults: {
        active: true
      }
    }).then((user, err) => {
      return done(err, user);
    });
  }
));
 
passport.use(new GoogleStrategy({
    clientID:     env.oauth.google.clientID,
    clientSecret: env.oauth.google.clientSecret,
    callbackURL: env.serverOrigin + '/auth/google/callback',
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    User.findOrCreate({
      where: {
        email: profile.email
      },
      defaults: {
        active: true
      }
    }).then((user, err) => {
      console.log(user)
      return done(err, user);
    });
  }
));

passport.use(new FacebookStrategy({
    clientID:     env.oauth.facebook.clientID,
    clientSecret: env.oauth.facebook.clientSecret,
    callbackURL: env.serverOrigin + '/auth/facebook/callback',
    graphApiVersion: 'v2.6'
  },
  (accessToken, refreshToken, profile, done) =>{
    console.log(profile);
    User.findOrCreate({
      where: {
        email: 'bingsteup@gmail.com'
      },
      default: {
        active: true
      }
    }).then((user, err) => {
      return done(err, user);
    });
  }
));

module.exports = passport
