'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('events', [
      {
        name: 'Детская Техническая Конференция 2025',
        description: 'Захватывающая конференция для детей, интересующихся технологиями и наукой. Участники смогут узнать о новых разработках и познакомиться с известными специалистами.',
        location: 'Севастополь, Россия',
        date: '2025-05-20',
        price: '500', 
        user_id: 7,
        img_url: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Детская Арт Выставка 2025',
        description: 'Яркая арт выставка, на которой дети смогут увидеть работы художников, а также принять участие в мастер-классах по рисованию.',
        location: 'Севастополь, Россия',
        date: '2025-06-10',
        price: '300',
        user_id: 6,
        img_url: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Детский Музыкальный Фестиваль',
        description: 'Детский музыкальный фестиваль, на котором юные таланты смогут продемонстрировать свои музыкальные способности.',
        location: 'Севастополь, Россия',
        date: '2025-07-01',
        price: '800',
        user_id: 5,
        img_url: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Детский Стартап Питчинг',
        description: 'Мероприятие для детей, которые хотят представить свои идеи и стартапы. Это отличная возможность научиться бизнес-навыкам с юного возраста.',
        location: 'Севастополь, Россия',
        date: '2025-04-15',
        price: '400',
        user_id: 5,
        img_url: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Детский Хакатон',
        description: 'Юные программисты соберутся на хакатоне, чтобы создать полезные и инновационные приложения. Это мероприятие для любителей технологий и программирования.',
        location: 'Севастополь, Россия',
        date: '2025-09-10',
        price: '200',
        user_id: 4,
        img_url: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Детский Фестиваль Еды и Напитков',
        description: 'Фестиваль для детей, на котором будут представлены различные блюда и напитки. Приятные и вкусные моменты для всей семьи.',
        location: 'Севастополь, Россия',
        date: '2025-08-05',
        price: '250',
        user_id: 3,
        img_url: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Онлайн Конференция по Веб-разработке для детей',
        description: 'Онлайн-конференция, где дети смогут изучать основы веб-разработки, а также научиться создавать свои собственные веб-сайты.',
        location: 'Севастополь, Россия',
        date: '2025-05-25',
        price: '100',
        img_url: '1',
        user_id: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Детский Мастер-класс по Фотографии',
        description: 'Мастер-класс для детей, на котором они смогут узнать основы фотографии и научиться делать красивые снимки.',
        location: 'Севастополь, Россия',
        date: '2025-06-25',
        price: '600',
        user_id: 11,
        img_url: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Детский Геймерский Турнир',
        description: 'Турнир для детей, увлекающихся видеоиграми. Участники смогут соревноваться в различных играх и выиграть призы.',
        location: 'Севастополь, Россия',
        date: '2025-07-18',
        price: '50',
        user_id: 2,
        img_url: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Детский Саммит по Цифровому Маркетингу',
        description: 'Саммит для детей, которые хотят узнать, как работают рекламные технологии и как они могут создавать свои собственные проекты в интернете.',
        location: 'Севастополь, Россия',
        date: '2025-10-12',
        price: '700',
        user_id: 1,
        img_url: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('events', null, {});
  }
};
