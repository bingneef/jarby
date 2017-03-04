const
  express = require('express'),
  router = express.Router(),
  SequelizeToJson = require('sequelize-to-json'),
  UserSerializer = require('../serializers/UserSerializer'),
  User = require('../models').User,
  SequelizeTokenify = require('sequelize-tokenify'),
  serializer = new SequelizeToJson(User, UserSerializer).
  env = '../config/env';

var passport = require('./../auth')
router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', {session: false}),
  (req, res) => {
    let user = req.user[0]
    res.render('oauth_callback', { apiToken: user.apiToken, origin: env.frontEndOrigin})
  });

router.get('/auth/google',
  passport.authenticate('google', { scope: 
    [ 'https://www.googleapis.com/auth/userinfo.email']
  })
);

router.get('/auth/google/callback', 
  passport.authenticate('google', {session: false}),
  (req, res) => {
    let user = req.user[0]
    res.render('oauth_callback', { apiToken: user.apiToken, origin: env.frontEndOrigin})
  });

router.get('/auth/facebook',
  passport.authenticate('facebook', { scope: [ 'user:email' ] }));

router.get('/auth/facebook/callback', 
  passport.authenticate('facebook', {session: false}),
  (req, res) => {
    let user = req.user[0]
    res.render('oauth_callback', { apiToken: user.apiToken, origin: env.frontEndOrigin})
  });

module.exports = router
