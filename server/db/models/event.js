"use strict";
const { Model } = require("sequelize");
const eventcomment = require("./eventcomment");

module.exports = (sequelize, DataTypes) => {
  class event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, eventComment }) {
      this.belongsToMany(User, {
        through: "userEvent",
        foreignKey: "event_id",
        as: "Attendees",
      });

      this.hasMany(eventComment, {
        foreignKey: "event_id",
        as: "CommentEvent",
      });
    }
  }

  event.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      date: DataTypes.DATE,
      img_url: DataTypes.STRING,
      location: DataTypes.STRING,
      price: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      group: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "event",
    }
  );

  return event;
};
