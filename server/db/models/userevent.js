"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class userEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, event }) {
      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "attendees",
      });

      this.belongsTo(event, {
        foreignKey: "event_id",
        as: "event",
      });
    }
  }

  userEvent.init(
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userEvent",
    }
  );

  return userEvent;
};
