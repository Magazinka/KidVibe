'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Gadget extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      this.belongsTo(User, {foreignKey: "user_id"})
    }
  }
  Gadget.init({
    name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    price: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Gadget',
  });
  return Gadget;
};