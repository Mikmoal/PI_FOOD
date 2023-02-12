require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require('./db.js');
const { API_KEY } = process.env;

const getAllRecipes = async () => {
    const dbRecipes = await Recipe.findAll();

    const apiRecipes = await axios.get(``)
}