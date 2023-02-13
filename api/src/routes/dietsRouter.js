const { Router } = require('express');
const { getDiets } = require("../controllers/dietController");

const dietsRouter = Router();

dietsRouter.get("/", getDiets);

module.exports = {dietsRouter};