"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init(
    {
      uuid: DataTypes.UUID,
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );

  Project.associate = function (models) {
    Project.hasMany(models.Device, {
      foreignKey: "projectId",
      as: "devices", // alias devices
    });
    Project.belongsToMany(models.User, {
      through: "UserProjects",
      foreignKey: "projectId",
      otherKey: "userId",
      as: "users",
    });
  };

  return Project;
};
