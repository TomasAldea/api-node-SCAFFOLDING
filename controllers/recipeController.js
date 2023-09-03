const Recipe = require('../models/recipeModel'); // Importa tu modelo de receta

//! Función para agregar una nueva receta
const addRecipe = async (req, res) => {
  const {
    title,
    description,
    ingredients,
    instructions,
    preparationTime,
    servings,
  } = req.body;

  // Crea una nueva instancia de la receta
  const newRecipe = new Recipe({
    title,
    description,
    ingredients,
    instructions,
    preparationTime,
    servings,
  });

  try {
    const savedRecipe = await newRecipe.save();
    res.status(201).json({ message: 'Receta creada exitosamente', recipe: savedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la receta', error: error.message });
  }
};

//! Función para editar una receta
const editRecipe = async (req, res) => {
  const recipeId = req.params.id; // Obtiene el ID de la receta de los parámetros de la URL
  const updateData = req.body; // Datos actualizados de la receta
  console.log(req.params);
  try {
    // Busca la receta por su ID y actualiza solo los campos proporcionados
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      { $set: updateData },
      { new: true } // Devuelve la receta actualizada en la respuesta
    );

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.status(200).json({ message: 'Receta actualizada correctamente', recipe: updatedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la receta', error: error.message });
  }
};

//! Función para eliminar una receta por su ID
const deleteRecipe = async (req, res) => {
  const recipeId = req.params.id; // Obtiene el ID de la receta de los parámetros de la URL

  try {
    // Busca la receta por su ID y elimínala
    const deletedRecipe = await Recipe.findByIdAndRemove(recipeId);

    if (!deletedRecipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.status(200).json({ message: 'Receta eliminada correctamente', recipe: deletedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la receta', error: error.message });
  }
};

//! Función para obtener una receta por su ID
const getRecipeById = async (req, res) => {
  const recipeId = req.params.id; // Obtiene el ID de la receta de los parámetros de la URL

  try {
    // Busca la receta por su ID en la base de datos
    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: 'Receta no encontrada' });
    }

    res.status(200).json({ recipe });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la receta', error: error.message });
  }
};

//! Función para obtener todas las recetas
const getAllRecipes = async (req, res) => {
  try {
    // Busca todas las recetas en la base de datos
    const recipes = await Recipe.find();

    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las recetas', error: error.message });
  }
};

module.exports = { addRecipe, editRecipe, deleteRecipe, getRecipeById, getAllRecipes };