const
  Recipe = require('models').Recipe;

var RecipeHelper = function () {};

RecipeHelper.prototype.getRecipe = function (req, res, next) {
  Recipe.findOne({
    where: {
      userId: req.currentUser.id,
      guid: req.params.guid
    }
  }).then( (recipe) => {
    if (recipe) {
      req.currentRecipe = recipe;
      next();
    } else {
      res.sendStatus(404);
    }
  }).catch( (error) => {
    res.status(400);
    res.send({message: JSON.stringify(error)});
  });
}

module.exports = new RecipeHelper();
