const
  express = require('express'),
  router = express.Router(),
  AuthenticationController = require('controllers/AuthenticationController'),
  AuthenticationHelper = require('helpers/AuthenticationHelper.js');

router.get('', (req, res) => {
  res.send({message: 'Hello! The API is at http://localhost:' + port + '/api'});
});

router.get('socket.io/*', (req, res, next) => {
  next();
});

router.get('/status', (req, res) => {
  res.send({message: 'Running smoothly'});
});

router.post('/login', (req, res) => {
  AuthenticationController.login(req, res);
});

router.post('/sign-up', (req, res) => {
  AuthenticationController.signUp(req, res);
});

router.all('/*', (req, res, next) => {
  AuthenticationHelper.authenticate(req, res, next);
});

router.post('/logout', (req, res) => {
  AuthenticationController.logout(req, res);
});

router.get('/current_user', (req, res) => {
  AuthenticationController.currentUser(req, res);
});

router.put('/current_user', (req, res) => {
  AuthenticationController.updateCurrentUser(req, res);
});

module.exports = router
