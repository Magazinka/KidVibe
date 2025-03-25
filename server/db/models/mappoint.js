'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const MapPoint = sequelize.define('MapPoint', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM(
        'Детская поликлиника',
        'Аквапарк',
        'Аптека',
        'Детский развлекательный парк',
        'Детский сад'
      ),
      allowNull: false
    },
    workingHours: DataTypes.STRING,
    phone: DataTypes.STRING
  }, {
    indexes: [
      {
        fields: ['category']
      },
      {
        fields: ['latitude', 'longitude']
      }
    ]
  });

  return MapPoint;
};