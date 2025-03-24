const gadgetRoutes = require("express").Router();
const { Gadget, User } = require("../db/models");


gadgetRoutes.get("/", async (req, res) => {
	try {
		console.log("GET ALL GADGETS");
		const allGadgets = await Gadget.findAll();
		res.status(200).json(allGadgets);
	} catch (error) {
		console.log("Error getting gadgets: ", error);
		res.status(400).json({ message: error });
	}
});

gadgetRoutes.get("/:id", async (req, res) => {
	try {
		const gadgetId = req.params.id;
		const id = Number(gadgetId);
		console.log("Gadget ID: ", gadgetId);
		const gadgetbd = await Gadget.findByPk(id);
		if (!gadgetbd) {
			res.status(404).json({ message: "Gadget not found" });
		} else {
			res.status(200).json(gadgetbd);
		}
	} catch (error) {
		console.log("Error getting one gadget: ", error);
		res.status(400).json({ message: "Error fetching gadget" });
	}
});

gadgetRoutes.post("/", async (req, res) => {
	console.log("REQBODY CREATE GADGET: ", req.body);
	try {
		const { name, price, user_id, image, group, description } = req.body;
		if (!name || !price || !user_id || !image || !group || !description) {
			return res.status(400).json({ message: "Missing required fields" });
		}
		const user = await User.findByPk(user_id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		const createGadget = await Gadget.create({
			name: name,
			user_id: user_id,
			price: String(price),
			image: image,
			group: group,
			description: description
		});
		const card = createGadget.get();
		delete card.createdAt;
		delete card.updatedAt;
		console.log("Gadget created: ", card);
		res.status(200).json({ card });
	} catch (error) {
		console.log("Error creating gadget: ", error);
		res.status(400).json({ message: "Error creating gadget" });
	}
});

gadgetRoutes.put("/:id", async (req, res) => {
	try {
		const gadgetId = req.params.id;
		const { name, price, image, group, description } = req.body;

		const gadget = await Gadget.findByPk(gadgetId);
		if (!gadget) {
			return res.status(404).json({ message: "Gadget not found" });
		}

		if (name) gadget.name = name;
		if (price) gadget.price = price;
		if (image) gadget.image = image;
		if (group) gadget.group = group;
		if (description) gadget.description = description;

		await gadget.save();
		res.status(200).json({ message: "Gadget updated successfully", gadget });
	} catch (error) {
		console.log("Error updating gadget: ", error);
		res.status(400).json({ message: "Error updating gadget" });
	}
});

gadgetRoutes.delete("/", async (req, res) => {
	try {
		const { id } = req.body;
		const card = await Gadget.findByPk(Number(id));
		if (!card) {
			return res.status(404).json({ message: "Gadget not found" });
		}
		await Gadget.destroy({ where: { id: Number(id) } });
		res.status(200).json({ message: "Gadget deleted successfully" });
	} catch (error) {
		console.log("Error deleting gadget: ", error);
		res.status(400).json({ message: "Error deleting gadget" });
	}
});

module.exports = gadgetRoutes;
// const gadgetRoutes = require("express").Router()
// const { gadget } = require("../db/models")

// gadgetRoutes.get("/", async (req,res) => {
//     try {
//         const allGadget = await gadget.findAll()
//         res.status(200).json(allGadget)
//     }catch(err){
//         res.status(400).json({ message: err });
//     }
// })

// module.exports = gadgetRoutes;
