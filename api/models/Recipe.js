const
  Sequelize = require('sequelize'),
  database = require('databaseConnection'),
  SequelizeTokenify = require('sequelize-tokenify'),
  generateName = require('sillyname');

Recipe = database.define('recipes',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    guid: {
      type: Sequelize.STRING,
      unique: true
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    }
  });

SequelizeTokenify.tokenify(Recipe, {
  field: 'guid',
  length: '16'
});

module.exports = Recipe
