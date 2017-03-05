const
  express = require('express'),
  router = express.Router(),
  SequelizeToJson = require('sequelize-to-json'),
  UserSerializer = require('../serializers/UserSerializer'),
  User = require('../models').User,
  SequelizeTokenify = require('sequelize-tokenify'),
  serializer = new SequelizeToJson(User, UserSerializer).
  env = '../config/env';

var passport = require('./../oauth')
router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', {session: false}),
  (req, res) => {
    let user = req.user
    res.render('oauth_callback', { apiToken: user.apiToken, origin: env.frontEndOrigin})
  });

router.get('/auth/google',
  passport.authenticate('google')
);

router.get('/auth/google/callback', 
  passport.authenticate('google', {session: false}),
  (req, res) => {
    let user = req.user
    res.render('oauth_callback', { apiToken: user.apiToken, origin: env.frontEndOrigin})
  });

module.exports = router
