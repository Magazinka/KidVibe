"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class eventComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, event }) {
      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "authorComment",
      });
      this.belongsTo(event, {
        foreignKey: "event_id",
        as: "eventComment",
      });
    }
  }
  eventComment.init(
    {
      user_id: DataTypes.INTEGER,
      event_id: DataTypes.INTEGER,
      text: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "eventComment",
    }
  );
  return eventComment;
};
