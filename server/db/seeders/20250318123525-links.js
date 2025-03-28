'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('links', [
      {
        url: 'https://www.who.int/news-room/fact-sheets/detail/infant-and-young-child-feeding',
        name: 'Рекомендации ВОЗ по кормлению детей',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186167/seed_links/mrljvmvwn7jfza76irgb.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.mayoclinic.org/healthy-lifestyle/infant-and-toddler-health/basics/infant-and-toddler-health/hlv-20049400',
        name: 'Советы Mayo Clinic по уходу за детьми',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186167/seed_links/pgrsdgt9sfpdmgmb8kdp.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.cdc.gov/ncbddd/childdevelopment/positiveparenting/index.html',
        name: 'CDC: Положительное воспитание детей',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186168/seed_links/f2lu3ksmh1zy9qyt94bh.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.healthychildren.org/English/ages-stages/baby/Pages/default.aspx',
        name: 'HealthyChildren.org: Уход за младенцами',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186167/seed_links/vinpcjxll5yyji7jkl1c.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.nhs.uk/conditions/pregnancy-and-baby/baby-care-advice/',
        name: 'NHS: Советы по уходу за ребенком',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186167/seed_links/hzcy8xoy9mcn7xngcxfx.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.parents.com/baby/care/',
        name: 'Parents.com: Уход за новорожденными',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186168/seed_links/done8kjqsanxcggnfkjt.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.babycenter.com/baby/care',
        name: 'BabyCenter: Советы по уходу за ребенком',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186167/seed_links/r8awmxwkclenug0dxab1.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.kidshealth.org/en/parents/center/',
        name: 'KidsHealth: Ресурсы для родителей',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186562/seed_links/awptbfeb9cfpt0kls8eh.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.zerotothree.org/resources',
        name: 'Zero to Three: Ресурсы для раннего развития',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186167/seed_links/vjschaoosbes5sfcxcbu.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        url: 'https://www.webmd.com/parenting/baby/default.htm',
        name: 'WebMD: Уход за ребенком',
        img: "https://res.cloudinary.com/dlliagivo/image/upload/v1743186168/seed_links/t8d7sboju3kbwug9nqy3.jpg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('links', null, {});
  }
};