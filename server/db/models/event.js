"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsToMany(User, {
        through: "userEvent",
        foreignKey: "event_id",
      });
    }
  }
  event.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      date: DataTypes.STRING,
      img_url: DataTypes.STRING,
      location: DataTypes.STRING,
      price: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "event",
    }
  );
  return event;
};
