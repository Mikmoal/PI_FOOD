const getRecipeByName = async (req, res) => {
  const { name } = req.query;
  try {
    const results = name ? await searchRecipeByName(name) : await getAllRecipes();
    res.status(200).json(results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
