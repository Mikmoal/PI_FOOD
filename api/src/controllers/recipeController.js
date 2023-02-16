require("dotenv").config();
const Sequelize = require("sequelize");
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;
const { Op } = Sequelize;

const cleanArray = (arr) =>
  arr.map((el) => {
    let stepsFormated = []; //1
    el.analyzedInstructions.forEach((item) => {
      item.steps.forEach((step) => {
        let stp = {};
        stp[step.number] = step.step;
        stepsFormated.push(stp);
      });
    });

    return {
      id: el.id, //int
      nombre: el.title, //string
      resumen: el.summary, //string
      health_score: el.healthScore, //double
      paso_a_paso: stepsFormated, //arr
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
  const dbRecipes = await Recipe.findAll({
    where: { nombre: { [Op.like]: `%${name}%` } },
    include: [
      { model: Diet, attributes: ["nombre"], through: { attributes: [] } },
    ],
  });

  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100`
    )
  ).data.results;

  const apiRecipes = apiRecipesRaw.filter(recipe => recipe.title.toLowerCase().includes(name.toLowerCase()));

  return [...dbRecipes, ...apiRecipes];
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
            `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`
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
  const recipeCreated = await Recipe.create({
    nombre,
    resumen,
    health_score,
    paso_a_paso,
    imagen,
  });
  await recipeCreated.addDiet(dietas);
}

module.exports = {
  getAllRecipes,
  searchRecipeByName,
  searchRecipeById,
  createRecipe,
};
