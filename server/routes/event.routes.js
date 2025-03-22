const eventRoutes = require("express").Router();
const { where } = require("sequelize");
const { event, User, userEvent } = require("../db/models");

eventRoutes.get("/", async (req, res) => {
  try {
    console.log("WORK");
    const allEvent = await event.findAll();

    const user = await User.findByPk;
    // console.log("allEvent: ", allEvent);
    res.status(200).json(allEvent);
  } catch (error) {
    console.log("error event get: ", error);
    res.status(400).json({ message: error });
  }
});
eventRoutes.get("/:id", async (req, res) => {
  console.log("wort");
  try {
    const eventId = req.params.id;
    const id = Number(eventId);
    console.log("event id: ", eventId);
    const eventbd = await event.findByPk(id);
    if (!event) {
      res.status(400).json({ message: "error" });
    } else {
      res.status(200).json(eventbd);
    }
  } catch (error) {
    console.log("error event one: ", error);
    res.status(400).json({ message: "event one err" });
  }
});

eventRoutes.post("/", async (req, res) => {
  console.log("REQBODY CREATE: ", req.body);
  try {
    const { name, description, location, price, date, user_id, group } =
      req.body;
    if (
      !name ||
      !description ||
      !location ||
      !price ||
      !date ||
      !user_id ||
      !group
    ) {
      return res.status(400).json({ message: "Error createEvent" });
    }
    const createEvent = await event.create({
      name,
      description,
      location,
      price,
      date,
      user_id,
      group,
    });
    const card = createEvent.get();
    delete card.createdAt;
    delete card.updatedAt;
    // console.log("card: ", card);
    res.status(200).json({ card });
  } catch (error) {
    console.log("error post create: ", error);
    res.status(400).json({ message: "err create event server" });
  }
});

eventRoutes.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    // console.log("id: ", id);

    const card = await event.findByPk(Number(id));
    // console.log("card: ", card);

    if (!card) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.destroy({ where: { id: Number(id) } });

    res.status(200).json({ message: "Event delet success" });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ message: "Error delet event" });
  }
});

eventRoutes.put("/:id", async (req, res) => {
  try {
    const { id, name, description, location, price } = req.body;

    const newDate = await event.findByPk(Number(id));

    const updateEvent = await newDate.update({
      name,
      description,
      location,
      price,
    });
    res.status(200).json(updateEvent);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ message: "Event update error" });
  }
});

module.exports = eventRoutes;
