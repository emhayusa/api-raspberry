"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wave extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wave.init(
    {
      deviceId: DataTypes.INTEGER,
      timestamp: DataTypes.DATE,
      swh: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Wave",
    }
  );

  Wave.associate = function (models) {
    Wave.belongsTo(models.Device, {
      foreignKey: "deviceId",
      as: "device",
    });
  };
  return Wave;
};
