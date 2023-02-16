require("dotenv").config();
const axios = require("axios");
const { Diet } = require("../db");
const { API_KEY } = process.env;

const getDiets = async (req, res) => {
  try {
    const apiDiets = (
      await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      )
    ).data.results;

    const allDietsArr = [];

    apiDiets.forEach((el) => {
      el.diets.forEach((diet) => {
        allDietsArr.push(diet);
      });
    });

    const filteredArr = new Set(allDietsArr);

    filteredArr.forEach(async (el) => {
      await Diet.findOrCreate({
        where: { nombre: el },
        defaults: {
          nombre: el
        }
      });
    });

    res.status(200).json([...filteredArr]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getDiets };
