require("dotenv").config();
const axios = require("axios");
const { Recipe, Diet } = require("../db");
const { API_KEY } = process.env;


const getDiets = async () => {
    const apiDiets = await axios.get(`https://spoonacular.com/food-api/docs#Diets`);
    
    return apiDiets.data;
}

module.exports = {getDiets}