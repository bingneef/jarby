const
  User = require('models/User.js'),
  Recipe = require('models/Recipe.js');

Recipe.belongsTo(User);
User.hasMany(Recipe, {onDelete: 'CASCADE'});

module.exports = {
  User: User,
  Recipe: Recipe
}
