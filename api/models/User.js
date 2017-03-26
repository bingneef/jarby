const
  Sequelize = require('sequelize'),
  database = require('databaseConnection'),
  SequelizeTokenify = require('sequelize-tokenify'),
  env = require('config/env'),
  crypto = require('crypto')

User = database.define('users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: Sequelize.STRING,
    apiToken: {
      type: Sequelize.STRING,
      unique: true
    },
    active: {
      type: Sequelize.BOOLEAN
    },
    avatarUrl: Sequelize.STRING
  });

SequelizeTokenify.tokenify(User, {
  field: 'apiToken',
  length: '24'
});

User.hook('beforeCreate', (user, options) => {
  user.password = User.convertPasswordToHash(user.password);
  return user
});

User.convertPasswordToHash = (password) => {
  if (!password) {
    return
  }
  return crypto.createHmac('sha256', env.secret).update(password).digest('hex');
}

module.exports = User
