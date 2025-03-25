'use strict';
/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MapPoints', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      latitude: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      longitude: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      category: {
        type: Sequelize.ENUM(
          'Детская поликлиника',
          'Аквапарк',
          'Аптека',
          'Детский развлекательный парк',
          'Детский сад'
        ),
        allowNull: false
      },
      workingHours: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addIndex('MapPoints', ['category']);
    await queryInterface.addIndex('MapPoints', ['latitude', 'longitude']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MapPoints');
  }
};