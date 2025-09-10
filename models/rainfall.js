"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rainfall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rainfall.init(
    {
      deviceId: DataTypes.INTEGER,
      timestamp: DataTypes.DATE,
      value: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Rainfall",
    }
  );
  Rainfall.associate = function (models) {
    Rainfall.belongsTo(models.Device, {
      foreignKey: "deviceId",
      as: "device",
    });
  };
  return Rainfall;
};
