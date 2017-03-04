const
  SequelizeToJson = require('sequelize-to-json'),
  UserSerializer = require('serializers/UserSerializer'),
  User = require('models').User,
  SequelizeTokenify = require('sequelize-tokenify'),
  serializer = new SequelizeToJson(User, UserSerializer);

var AuthenticationController = function () {};

AuthenticationController.prototype.currentUser = function (req, res) {
  res.send(serializer.serialize(req.currentUser));
}

AuthenticationController.prototype.login = function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.status(422);
    res.send({message: "INVALID_CREDENTIALS"});
    return
  }

  User.findOne({
    where: {
      email: req.body.email,
      password: User.convertPasswordToHash(req.body.password)
    }
  }).then( (user) => {
    if (user) {
      user.update({
        apiToken: null,
        active: true
      }).then( (user) => {
        res.send(serializer.serialize(user));
      })
    } else {
      res.status(401);
      res.send({message: "INVALID_CREDENTIALS"});
    }
  }).catch( (error) => {
    res.status(500);
    res.send({message: error});
  });
}

AuthenticationController.prototype.signUp = function (req, res) {
  User.create(userParams(req)).then( (user) => {
    res.send(serializer.serialize(user));
  }).catch( (error) => {
    res.status(422);
    res.send({message: error});
  });
}

AuthenticationController.prototype.logout = function (req, res) {
  req.currentUser.update({
    active: false
  }).then( (user) => {
    res.status(204);
    res.send();
  }).catch( (error) => {
    res.status(422);
    res.send({message: error})
  })
}

AuthenticationController.prototype.updateCurrentUser = function (req, res) {
  req.currentUser.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
  ).then( (currentUser) => {
    res.send(serializer.serialize(currentUser));
  }).catch( (error) => {
    res.status(422);
    res.send({message: JSON.stringify(error)});
  })
};

function userParams (req) {
  return {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    active: true
  }
}

module.exports = new AuthenticationController();
