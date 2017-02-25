"use strict";

const
  Recipe = require('models').Recipe,
  SequelizeToJson = require('sequelize-to-json'),
  RecipeSerializer = require('serializers/RecipeSerializer'),
  SequelizeTokenify = require('sequelize-tokenify'),
  serializer = new SequelizeToJson(Recipe, RecipeSerializer);

var RecipeController = function () {};

RecipeController.prototype.index = function (req, res) {
  Recipe.findAll({
    where: {
      userId: req.currentUser.id,
    }
  })
  .then( (recipes) => {
    res.send(SequelizeToJson.serializeMany(recipes, Recipe, RecipeSerializer));
  }).catch( (error) => {
    if (error) {
      res.status(403);
      res.send({message: error});
    } else {
      res.status(404);
    }
  });
}

RecipeController.prototype.show = function (req, res) {
  res.send(serializer.serialize(req.currentRecipe));
};

RecipeController.prototype.create = function (req, res) {
  Recipe.create(recipeParams(req))
  .then( (recipe) => {
    res.send(serializer.serialize(recipe));
  })
  .catch( (error) => {
    res.status(403);
    res.send({message: error});
  });
}

RecipeController.prototype.destroy = function (req, res) {
  req.currentRecipe.destroy()
  .then( () => {
    res.status(204);
    res.send();
  }).catch( (error) => {
    res.status(422);
    res.send({message: JSON.stringify(error)});
  });
}

RecipeController.prototype.update = function (req, res) {
  req.currentRecipe.update(recipeParams(req)).then( (recipe) => {
    res.send(serializer.serialize(recipe));
  }).catch( (error) => {
    res.status(422);
    res.send({message: JSON.stringify(error)});
  })
};

function recipeParams (req) {
  return {
    userId: req.currentUser.id,
    title: req.body.title,
    description: req.body.description,
    ingredients: req.body.ingredients,
    preparingMethod: req.body.preparingMethod
  }
}

module.exports = new RecipeController();
