"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Device extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Device.init(
    {
      uuid: DataTypes.UUID,
      name: DataTypes.STRING,
      serialNumber: DataTypes.STRING,
      projectId: DataTypes.INTEGER, // foreign key
    },
    {
      sequelize,
      modelName: "Device",
    }
  );
  Device.associate = function (models) {
    Device.belongsTo(models.Project, {
      foreignKey: "projectId",
      as: "project",
    });

    Device.hasMany(models.Gnss, { foreignKey: "deviceId", as: "gnssData" });
    Device.hasMany(models.WaterLevel, {
      foreignKey: "deviceId",
      as: "waterLevelData",
    });
    Device.hasMany(models.Wave, { foreignKey: "deviceId", as: "waveData" });

    Device.hasMany(models.Rainfall, {
      foreignKey: "deviceId",
      as: "rainFallData",
    });
  };
  return Device;
};
