const
  Sequelize = require('sequelize'),
  database = require('databaseConnection');

Oauth = database.define('oauth',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: Sequelize.STRING
    },
    identifier: {
      type: Sequelize.STRING
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  });

module.exports = Oauth
