const {
  getAllRecipes,
  searchRecipeByName,
  searchRecipeById,
  createRecipe
} = require("../controllers/recipeController");

const getRecipeByName = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name
      ? await searchRecipeByName(name)
      : await getAllRecipes();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipeByID = async (req,res) => {
  const {id} = req.params;
  const source = isNaN(id) ? "db" : "api";
  try {
    
    const recipe = await searchRecipeById(id, source);
    
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRecipeHandler = async (req, res) => {
  try {
    const {
      nombre,
      resumen,
      health_score,
      paso_a_paso,
      imagen,
      dietas
    } = req.body;
    const newRecipe = await createRecipe(
      nombre,
      resumen,
      health_score,
      paso_a_paso,
      imagen,
      dietas
    );
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getRecipeByName,
  getRecipeByID,
  createRecipeHandler,
};
