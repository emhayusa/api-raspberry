"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Gnss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gnss.init(
    {
      deviceId: DataTypes.INTEGER,
      uuid: DataTypes.UUID,
      gpst: DataTypes.STRING,
      latitude: DataTypes.FLOAT,
      longitude: DataTypes.FLOAT,
      altitude: DataTypes.FLOAT,
      q: DataTypes.INTEGER,
      ns: DataTypes.INTEGER,
      sdn: DataTypes.FLOAT,
      sde: DataTypes.FLOAT,
      sdu: DataTypes.FLOAT,
      sdne: DataTypes.FLOAT,
      sdeu: DataTypes.FLOAT,
      sdun: DataTypes.FLOAT,
      age: DataTypes.INTEGER,
      ratio: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Gnss",
    }
  );

  Gnss.associate = function (models) {
    Gnss.belongsTo(models.Device, { foreignKey: "deviceId", as: "device" });
  };

  return Gnss;
};
