"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  User.init(
    {
      username: DataTypes.STRING,
      password_hash: DataTypes.STRING,
      email: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.associate = (models) => {
    //User.belongsTo(models.Role, { foreignKey: "roleId" });
    User.belongsToMany(models.Role, {
      through: "UserRoles",
      foreignKey: "userId",
    });

    User.belongsToMany(models.Project, {
      through: "UserProjects",
      foreignKey: "userId",
      as: "projects",
    });
  };
  return User;
};
