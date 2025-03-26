"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"Gadgets",
			[
				{
					name: "Кроватка Happy Baby Mommy Lux",
					price: "42 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1743014715/seed_gadgets/vjd1hshtzt4xpjhklgqr.jpg",
					group: "Мебель",
					description:
						"Очень удобная и функциональная кроватка. Регулируемое дно позволяет использовать её долгое время, а качество материалов на высоте. Сборка простая, но требует внимательности. Отлично вписывается в интерьер.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Стульчик для кормления Chicco Polly",
					price: "12 500",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1743014714/seed_gadgets/no2eqshcwuvevwabagbe.jpg",
					group: "Мебель",
					description:
						"Практичный и компактный стульчик. Легко складывается, что удобно для хранения и транспортировки. Мягкие вставки съемные, их легко мыть. Ребенку удобно сидеть, а родителям — кормить. Рекомендую!",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Манеж Geuther Happy Play",
					price: "18 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1743014714/seed_gadgets/jawmozalv8o8xfrm6xkr.jpg",
					group: "Мебель",
					description:
						"Надежный и безопасный манеж. Просторный, с сетчатыми стенками, которые обеспечивают хороший обзор. Дно мягкое, но при этом прочное. Легко складывается и переносится. Идеально для активных малышей.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Автокресло Britax Romer Kidfix",
					price: "25 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1743014715/seed_gadgets/xh6oyzbol3xuxvaepkaj.jpg",
					group: "Транспорт",
					description:
						"Отличное автокресло для детей постарше. Удобное, с боковой защитой и регулируемой спинкой. Ребенок чувствует себя комфортно даже в долгих поездках. Качество материалов и сборки на высоте.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Пеленальный столик IKEA Sundvik",
					price: "8 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1743014714/seed_gadgets/smthspctq1nxwvie0wui.jpg",
					group: "Мебель",
					description:
						"Простой, но очень удобный столик. Вместительные полки позволяют хранить все необходимое под рукой. Легко собирается и устойчив. Отличное решение для организации пространства в детской.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Велосипед Puky LR M",
					price: "15 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1743014714/seed_gadgets/h5seleyrukwl9txs9qjm.jpg",
					group: "Транспорт",
					description:
						"Качественный детский велосипед. Легкий, но прочный, с регулируемым сиденьем и рулем. Ребенок быстро научился кататься благодаря устойчивости и удобству. Отличный выбор для первых поездок.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Игровой коврик Tiny Love Sunny Day",
					price: "5 500",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1743014714/seed_gadgets/kf1pn4s9vk9crtx1ggqj.jpg",
					group: "Игрушки",
					description:
						"Яркий и интересный коврик для малышей. Игрушки на дугах привлекают внимание, а мягкая поверхность удобна для игр. Легко складывается и чистится. Ребенок проводит на нем много времени с удовольствием.",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					name: "Детская коляска Cybex Priam IV 3 в 1 by Jeremy Scott Car",
					price: "480 000",
					image: "https://res.cloudinary.com/dlliagivo/image/upload/v1743015579/seed_gadgets/lbjauj1lfk9z22flqxgv.jpg",
					group: "Аксессуары",
					description:
						"Стильная и функциональная коляска премиум-класса. Идеально управляется одной рукой, дизайн выделяет среди других моделей — выглядит дорого и необычно. Качество материалов и ходовая часть на высоте.",
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
