const { Router } = require('express');
const {getRecipeByName, getRecipeByID, createRecipeHandler} = require("../handlers/recipeHandlers");
const { validate } = require("../middlewares/validations");

const recipesRouter = Router();


recipesRouter.get("/", getRecipeByName);
recipesRouter.get("/:id", getRecipeByID);
recipesRouter.post("/",validate, createRecipeHandler);



module.exports = {recipesRouter};