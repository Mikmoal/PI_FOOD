const { Router } = require('express');

const dietsRouter = Router();

dietsRouter.get("/", getDiets);

module.exports = dietsRouter;