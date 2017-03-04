const
  User = require('models/User.js'),
  Recipe = require('models/Recipe.js'),
  Oauth = require('models/Oauth.js');

Recipe.belongsTo(User);
User.hasMany(Recipe, {onDelete: 'CASCADE'});

Oauth.belongsTo(User);
User.hasMany(Oauth, {onDelete: 'CASCADE'});

module.exports = {
  User: User,
  Recipe: Recipe,
  Oauth: Oauth
}
