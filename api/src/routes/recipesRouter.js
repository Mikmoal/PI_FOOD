const { Router } = require('express');
const {getRecipeByName,getRecipeById,createRecipe} = require("../handlers/recipeHandlers");

const recipesRouter = Router();

recipesRouter.get("/", getRecipeByName);
recipesRouter.get("/:id", getRecipeById);
recipesRouter.post("/", createRecipe);



module.export = recipesRouter;