const mongoose = require('mongoose');

// Define el esquema para las recetas
const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
    required: true,
  }],
  instructions: {
    type: String,
    required: true,
  },
  preparationTime: {
    type: Number,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    default: "defaultRecipe.png"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Crea el modelo de receta a partir del esquema
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
