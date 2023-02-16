const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    id: {
      // type: DataTypes.UUID,
      // defaultValue: DataTypes.UUIDV4,
      // allowNull: false
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    }
  }, {
    timestamps: false,
    freezeTableName: true,
  });
};
