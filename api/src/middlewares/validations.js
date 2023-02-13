const validate = (req, res, next) => {
    const { nombre, resumen, health_score, paso_a_paso, imagen, dietas } = req.body;
    if(!nombre || !resumen || !health_score || !paso_a_paso || !imagen || !dietas)
        return res.status(400).json({error: "Missing information"});

    next();
};

module.exports = {validate}