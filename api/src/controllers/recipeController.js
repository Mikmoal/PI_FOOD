require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;

const cleanArray = (arr) =>
  arr.map((el) => {
    return {
      id: el.id, //int
      nombre: el.title, //string
      resumen: el.summary, //string
      health_score: el.healthScore, //double
      paso_a_paso: el.analyzedInstructions[0].steps, //arr
      imagen: el.image, //string
      dietas: el.diets, //arr
    };
  });

const getAllRecipes = async () => {
  const dbRecipes = await Recipe.findAll();

  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`
    )
  ).data.results;
  const apiRecipes = cleanArray(apiRecipesRaw);

  return [...dbRecipes, ...apiRecipes];
};

const searchRecipeByName = async (name) => {
  const dbRecipes = Recipe.findAll({
    where: { name },
  });
  const apiRecipesRaw = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?api_key=${API_KEY}`
  ).data;

  const apiRecipes = cleanArray(apiRecipesRaw);

  const filteredApi = apiRecipes.filter((recipe) => {
    recipe.nombre.toLowerCase().includes(name.toLowerCase());
  });

  if (dbRecipes.length > 0 || filteredApi.length > 0)
    return [...dbRecipes, ...filteredApi];
  else return res.status(404).send({ msg: "Recipe name not found" });
};

const searchRecipeById = async (id, source) => {
  const recipe =
    source === "db"
      ? await Recipe.findByPk(id, {
          include: {
            model: Diet,
            attributes: ["nombre"],
            through: {
              attributes: [],
            },
          },
        })
      : (
          await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information&addRecipeInformation=true?api_key=${API_KEY}`
          )
        ).data;
  return recipe;
};

const createRecipe = async (
  nombre,
  resumen,
  health_score,
  paso_a_paso,
  imagen,
  dietas
) => {
  await Recipe.create({
    nombre,
    resumen,
    health_score,
    paso_a_paso,
    imagen
  });
};

module.exports = {
  getAllRecipes,
  searchRecipeByName,
  searchRecipeById,
  createRecipe
};
