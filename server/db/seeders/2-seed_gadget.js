'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Gadgets', [
      {
        name: 'Кроватка Happy Baby Mommy Love',
        price: '42 000',
        image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742326474/xs2y5n4dsmlxi7wuzh5s.jpg",
        group: 'Мебель', // Добавлена категория
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Стульчик для кормления Chicco Polly',
        price: '12 500',
        image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395332/tnscvvtimfgk9bjz4cvh.jpg",
        group: 'Мебель', // Добавлена категория
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Манеж Geuther Happy Play',
        price: '18 000',
        image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395456/ce1mc2asykppdridqyhz.jpg",
        group: 'Мебель', // Добавлена категория
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Автокресло Britax Romer Kidfix',
        price: '25 000',
        image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395560/tairqxtcigc6nclqullq.jpg",
        group: 'Транспорт', // Добавлена категория
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Пеленальный столик IKEA Sundvik',
        price: '8 000',
        image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395649/kpcopz69ojw28e0hecgo.jpg",
        group: 'Мебель', // Добавлена категория
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Велосипед Puky LR M',
        price: '15 000',
        image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395771/auw4c1ssnnj48nljouhk.webp",
        group: 'Транспорт', // Добавлена категория
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Игровой коврик Tiny Love Sunny Day',
        price: '5 500',
        image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395860/djo0oaoyhuukiud9v1ch.webp",
        group: 'Игрушки', // Добавлена категория
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Рюкзак-переноска Ergobaby Omni 360',
        price: '14 000',
        image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395966/gxaouydybjwfuuh6nrid.jpg",
        group: 'Аксессуары', // Добавлена категория
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Gadgets', null, {});
  }
};