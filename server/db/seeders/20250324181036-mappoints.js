'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('MapPoints', [
      // Детские поликлиники
      {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'Детская поликлиника №1',
        address: 'ул. Ленина, 25',
        latitude: 44.6115,
        longitude: 33.5223,
        category: 'Детская поликлиника',
        workingHours: '08:00-18:00',
        phone: '+79781234567',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'b1eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        name: 'Детская поликлиника №3',
        address: 'ул. Острякова, 5',
        latitude: 44.6021,
        longitude: 33.5198,
        category: 'Детская поликлиника',
        workingHours: '08:00-20:00',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Аквапарки
      {
        id: 'c2eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        name: 'Аквапарк "Зурбаган"',
        address: 'Парк Победы',
        latitude: 44.5806,
        longitude: 33.5229,
        category: 'Аквапарк',
        workingHours: '10:00-20:00',
        phone: '+79787654321',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Аптеки
      {
        id: 'd3eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
        name: 'Аптека №123',
        address: 'ул. Большая Морская, 10',
        latitude: 44.6165,
        longitude: 33.5257,
        category: 'Аптека',
        workingHours: 'круглосуточно',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Детские развлекательные парки
      {
        id: 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
        name: 'Парк аттракционов "Лукоморье"',
        address: 'ул. Парковая, 1',
        latitude: 44.5634,
        longitude: 33.4068,
        category: 'Детский развлекательный парк',
        createdAt: new Date(),
        updatedAt: new Date()
      },

      // Детские сады
      {
        id: 'f5eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
        name: 'Детский сад №85 "Солнышко"',
        address: 'ул. Репина, 15',
        latitude: 44.6072,
        longitude: 33.5191,
        category: 'Детский сад',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('MapPoints', null, {});
  }
};