'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('links', [
      {
        url: 'https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding',
        name: 'Рекомендации ВОЗ по кормлению детей',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/basics/infant-and-toddler-health/hlv-20049400',
        name: 'Советы Mayo Clinic по уходу за детьми',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/index.html',
        name: 'CDC: Положительное воспитание детей',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.healthychildren.org/English/ages-stages/baby/Pages/default.aspx',
        name: 'HealthyChildren.org: Уход за младенцами',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.nhs.uk/conditions/pregnancy-and-baby/baby-care-advice/',
        name: 'NHS: Советы по уходу за ребенком',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.parents.com/baby/care/',
        name: 'Parents.com: Уход за новорожденными',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.babycenter.com/baby/care',
        name: 'BabyCenter: Советы по уходу за ребенком',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.kidshealth.org/en/parents/center/',
        name: 'KidsHealth: Ресурсы для родителей',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.zerotothree.org/resources',
        name: 'Zero to Three: Ресурсы для раннего развития',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.webmd.com/parenting/baby/default.htm',
        name: 'WebMD: Уход за ребенком',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('links', null, {});
  }
};