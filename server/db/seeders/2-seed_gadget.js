"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Gadgets",
			[
				{
					name: "Кроватка Happy Baby Mommy Love",
					price: "42 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742326474/xs2y5n4dsmlxi7wuzh5s.jpg",
					group: "Мебель",
					description:
						"Очень удобная и функциональная кроватка. Регулируемое дно позволяет использовать её долгое время, а качество материалов на высоте. Сборка простая, но требует внимательности. Отлично вписывается в интерьер.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Стульчик для кормления Chicco Polly",
					price: "12 500",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395332/tnscvvtimfgk9bjz4cvh.jpg",
					group: "Мебель",
					description:
						"Практичный и компактный стульчик. Легко складывается, что удобно для хранения и транспортировки. Мягкие вставки съемные, их легко мыть. Ребенку удобно сидеть, а родителям — кормить. Рекомендую!",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Манеж Geuther Happy Play",
					price: "18 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395456/ce1mc2asykppdridqyhz.jpg",
					group: "Мебель",
					description:
						"Надежный и безопасный манеж. Просторный, с сетчатыми стенками, которые обеспечивают хороший обзор. Дно мягкое, но при этом прочное. Легко складывается и переносится. Идеально для активных малышей.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Автокресло Britax Romer Kidfix",
					price: "25 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395560/tairqxtcigc6nclqullq.jpg",
					group: "Транспорт",
					description:
						"Отличное автокресло для детей постарше. Удобное, с боковой защитой и регулируемой спинкой. Ребенок чувствует себя комфортно даже в долгих поездках. Качество материалов и сборки на высоте.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Пеленальный столик IKEA Sundvik",
					price: "8 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395649/kpcopz69ojw28e0hecgo.jpg",
					group: "Мебель",
					description:
						"Простой, но очень удобный столик. Вместительные полки позволяют хранить все необходимое под рукой. Легко собирается и устойчив. Отличное решение для организации пространства в детской.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Велосипед Puky LR M",
					price: "15 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395771/auw4c1ssnnj48nljouhk.webp",
					group: "Транспорт",
					description:
						"Качественный детский велосипед. Легкий, но прочный, с регулируемым сиденьем и рулем. Ребенок быстро научился кататься благодаря устойчивости и удобству. Отличный выбор для первых поездок.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Игровой коврик Tiny Love Sunny Day",
					price: "5 500",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395860/djo0oaoyhuukiud9v1ch.webp",
					group: "Игрушки",
					description:
						"Яркий и интересный коврик для малышей. Игрушки на дугах привлекают внимание, а мягкая поверхность удобна для игр. Легко складывается и чистится. Ребенок проводит на нем много времени с удовольствием.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Рюкзак-переноска Ergobaby Omni 360",
					price: "14 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1742395966/gxaouydybjwfuuh6nrid.jpg",
					group: "Аксессуары",
					description:
						"Удобный и эргономичный рюкзак-переноска. Подходит с рождения, регулируется под рост ребенка и родителя. Спина не устает даже после долгого ношения. Качество материалов и продуманность на высоте.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Gadgets", null, {});
	},
};
