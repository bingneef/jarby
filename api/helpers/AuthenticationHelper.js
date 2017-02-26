const
  Models = require('models');

var AuthenticateHelper = function () {};

AuthenticateHelper.prototype.authenticate = function (req, res, next) {
  try {
    apiToken = req.headers['authorization'].split('=')[1];
    Models.User.findOne({
      where: {
        apiToken: apiToken,
        active: true
      }
    }).then( (user) => {
      if (user) {
        req.currentUser = user;
        next();
      } else {
        res.sendStatus(401);
      }
    })
  } catch(exception) {
    res.sendStatus(401);
  };
}

module.exports = new AuthenticateHelper();
