"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WaterLevel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  WaterLevel.init(
    {
      deviceId: DataTypes.INTEGER,
      timestamp: DataTypes.DATE,
      value: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "WaterLevel",
    }
  );
  WaterLevel.associate = function (models) {
    WaterLevel.belongsTo(models.Device, {
      foreignKey: "deviceId",
      as: "device",
    });
  };
  return WaterLevel;
};
