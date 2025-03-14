'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({announcement, gadget, event}) {
      this.hasMany(announcement, {foreignKey:"user_id"}),
      this.hasMany(gadget, {foreignKey:"user_id"}),
      this.belongsToMany(event, {through:"userEvent",foreignKey:"user_id"})
    }
  }
  user.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};