const eventRoutes = require("express").Router();
const { event, User } = require("../db/models");

eventRoutes.get("/", async (req, res) => {
  try {
    console.log("WORK");
    const allEvent = await event.findAll();
    const eventWhithUser = await Promise.all(
      allEvent.map(async (item) => {
        const user = await User.findByPk(item.user_id);
        const userForEvent = user.get()
        delete userForEvent.createdAt;
        delete userForEvent.updatedAt;
        delete userForEvent.password;
        
        console.log("user: ", user);

        return {
          ...item.toJSON(),
          user: user ? user.toJSON() : null,
        };
      })
    );
    // console.log("eventWhithUser: ", eventWhithUser);

    // console.log("allEvent: ", allEvent);
    res.status(200).json(eventWhithUser);
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
    const { name, description, location, price, date, userId } = req.body;
    if (!name || !description || !location || !price || !date || !userId) {
      return res.status(400).json({ message: "Error createEvent" });
    }
    const createEvent = await event.create({
      name,
      description,
      location,
      price,
      date,
      userId,
    });
    const card = createEvent.get();
    delete card.createdAt;
    delete card.updatedAt;
    console.log("card: ", card);
    res.status(200).json({ card });
  } catch (error) {
    console.log("error post create: ", error);
    res.status(400).json({ message: "err create event server" });
  }
});

module.exports = eventRoutes;
