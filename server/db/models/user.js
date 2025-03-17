"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ announcement, Gadget, event }) {
      this.hasMany(announcement, { foreignKey: "user_id" });
      this.hasMany(Gadget, { foreignKey: "user_id" });
      this.belongsToMany(event, {
        through: "userEvent",
        foreignKey: "user_id",
      });
    }
  }

  User.init(
    {
      login: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
