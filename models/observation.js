"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Observation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Observation.init(
    {
      datetime: DataTypes.DATE,
      lon: DataTypes.FLOAT,
      lat: DataTypes.FLOAT,
      value: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Observation",
    }
  );
  return Observation;
};
