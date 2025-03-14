'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('events', [
      {
        name: 'Tech Conference 2025',
        location: 'Moscow, Russia',
        date: '2025-05-20',
        price: 1500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Art Exhibition 2025',
        location: 'Saint Petersburg, Russia',
        date: '2025-06-10',
        price: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Music Festival',
        location: 'Sochi, Russia',
        date: '2025-07-01',
        price: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Startup Pitching Event',
        location: 'Kazan, Russia',
        date: '2025-04-15',
        price: 1200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tech Hackathon',
        location: 'Yekaterinburg, Russia',
        date: '2025-09-10',
        price: 500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Food and Drink Festival',
        location: 'Vladivostok, Russia',
        date: '2025-08-05',
        price: 800,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Online Web Development Conference',
        location: 'Online',
        date: '2025-05-25',
        price: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Photography Masterclass',
        location: 'Novosibirsk, Russia',
        date: '2025-06-25',
        price: 2500,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gaming Tournament',
        location: 'Samara, Russia',
        date: '2025-07-18',
        price: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Digital Marketing Summit',
        location: 'Rostov-on-Don, Russia',
        date: '2025-10-12',
        price: 1800,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {});
  }
};
