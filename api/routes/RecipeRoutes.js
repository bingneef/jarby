const
  express = require('express');
  router = express.Router();
  RecipeController = require('controllers/RecipeController'),
  RecipeHelper = require('helpers/RecipeHelper');

router.get('/recipes', (req, res) => {
  RecipeController.index(req, res);
})

router.post('/recipes', (req, res) => {
  RecipeController.create(req, res);
})

router.all('/recipes/:guid*?', (req, res, next) => {
  RecipeHelper.getRecipe(req, res, next);
})

router.get('/recipes/:guid', (req, res) => {
  RecipeController.show(req, res);
});

router.put('/recipes/:guid', (req, res) => {
  RecipeController.update(req, res);
});

router.delete('/recipes/:guid', (req, res) => {
  RecipeController.destroy(req, res);
});

module.exports = router
