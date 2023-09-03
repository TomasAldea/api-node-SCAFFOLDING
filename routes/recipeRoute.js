const express = require('express');
const router = express.Router();
const recipeController = require("../controllers/recipeController");

// Define las rutas
router.post("/recipes", recipeController.addRecipe);
router.patch("/recipes/:id", recipeController.editRecipe);
router.delete('/recipes/:id', recipeController.deleteRecipe);
router.get('/recipes/:id', recipeController.getRecipeById); // Nueva ruta para obtener una receta por su ID
router.get('/recipes', recipeController.getAllRecipes); // Nueva ruta para obtener todas las recetas

// Exporta el enrutador
module.exports = router;