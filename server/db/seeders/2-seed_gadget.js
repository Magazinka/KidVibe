'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Gadgets', [
      {
        name: 'Кроватка Happy Baby Mommy Love',
        price: '42 000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Стульчик для кормления Chicco Polly',
        price: '12 500',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Манеж Geuther Happy Play',
        price: '18 000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Автокресло Britax Romer Kidfix',
        price: '25 000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Пеленальный столик IKEA Sundvik',
        price: '8 000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Велосипед Puky LR M',
        price: '15 000',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Игровой коврик Tiny Love Sunny Day',
        price: '5 500',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Рюкзак-переноска Ergobaby Omni 360',
        price: '14 000',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gadgets', null, {});
  }
};
