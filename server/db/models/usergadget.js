'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usergadget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Gadget }) {
      this.belongsTo(User, {
        foreignKey: "user_id",
      });

      this.belongsTo(Gadget, {
        foreignKey: "gadget_id",
      });
    }
  }
  Usergadget.init({
    user_id: DataTypes.INTEGER,
    gadget_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usergadget',
  });
  return Usergadget;
};