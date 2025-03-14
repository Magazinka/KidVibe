const eventRoutes = require("express").Router();
const { event } = require("../db/models");

eventRoutes.get("/", async (req, res) => {
  try {
    console.log("WORK");
    const allEvent = await event.findAll();
    // console.log("allEvent: ", allEvent);
    res.status(200).json(allEvent);
  } catch (error) {
    console.log("error event get: ", error);
    res.status(400).json({ message: error });
  }
});
eventRoutes.get("/:id", async (req, res) => {
  console.log("wort")
  try {
    const eventId = req.params.id;
    const id = Number(eventId);
    console.log("event id: ", eventId);
    const eventbd = await event.findByPk(id );
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
module.exports = eventRoutes;
