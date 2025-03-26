const signupGadget = require("express").Router();
const { Gadget, User, Usergadget } = require("../db/models");

signupGadget.get("/signup", async (req, res) => {
	const { gadgetId, userId } = req.query;

	try {
		const signups = await User.findAll({
			attributes: ["id", "login", "email"],
			include: {
				model: Gadget,
				as: "gadgets",
				attributes: [],
				where: { id: gadgetId },
			},
		});

		if (!signups) {
			res.status(400).json({ message: "err signups" });
		}

		return res.json(signups);
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: "Ошибка при получении данных" });
	}
});

signupGadget.post("/signup", async (req, res) => {
	try {
		const { user_id, gadget_id } = req.body;

		if (!user_id || !gadget_id) {
			return res.status(400).json({ message: "Ошибка: необходимо передать user_id и gadget_id" });
		}

		const gadgetExist = await Gadget.findByPk(gadget_id);
		if (!gadgetExist) {
			return res.status(404).json({ message: "Гаджет с таким ID не найден" });
		}

		const existingSignup = await Usergadget.findOne({
			where: {
				user_id,
				gadget_id,
			},
		});

		if (existingSignup) {
			return res.status(400).json({ message: "Вы уже забронировали этот гаджет" });
		}

		const signupCreate = await Usergadget.create({
			user_id,
			gadget_id,
		});

		const signups = await User.findAll({
			attributes: ["id", "login", "email"],
			include: {
				model: Gadget,
				as: "gadgets",
				attributes: [],
				where: { id: gadget_id },
			},
		});

		res.status(200).json(signups);
	} catch (error) {
		console.log("error: ", error);
		res.status(500).json({ message: "Ошибка при создании брони" });
	}
});

signupGadget.post("/signup/users", async (req, res) => {
	try {
		const { gadget_id } = req.body;

		if (!gadget_id) {
			return res.status(400).json({ message: "Необходимо передать gadget_id" });
		}

		const gadgetWithUsers = await Gadget.findOne({
			where: { id: gadget_id },
			include: [
				{
					model: User,
					as: "users",
					attributes: ["login", "email"],
					through: { attributes: [] },
				},
			],
		});

		if (gadgetWithUsers && gadgetWithUsers.users.length > 0) {
			const usernames = gadgetWithUsers.users.map(user => user.login);
			res.status(200).json({ users: usernames });
		} else {
			res.status(404).json({ message: "Нет пользователей, зарегистрированных на этот гаджет." });
		}
	} catch (error) {
		console.log("Error:", error);
		res.status(500).json({ message: "Ошибка при получении данных", error });
	}
});

signupGadget.delete("/signup", async (req, res) => {
	try {
		const { user_id, gadget_id } = req.body;

		if (!user_id || !gadget_id) {
			return res.status(400).json({ message: "Ошибка: необходимо передать user_id и gadget_id" });
		}

		const UserGadget = await Usergadget.findOne({
			where: { user_id, gadget_id },
		});

		if (!UserGadget) {
			return res.status(404).json({ message: "User is not signed up for this gadget." });
		}

		await UserGadget.destroy({
			where: {
				user_id,
				gadget_id,
			},
		});

		res.status(200).json({ message: "Вы успешно отписались от гаджета" });
	} catch (error) {
		console.log("error: ", error);
		res.status(500).json({ message: "Ошибка при удалении записи" });
	}
});

module.exports = signupGadget;
