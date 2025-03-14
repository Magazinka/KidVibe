const eventRoutes = require("exspress").Router();
const { Event } = require("../db/models");

eventRoutes.get("/event", async (req, res) => {
  try {
    const allEvent = await Event.findAll();
    console.log("allEvent: ", allEvent);
    res.status(200).json(allEvent);
  } catch (error) {
    console.log("error event get: ", error);
    res.status(400).json({ message: error });
  }
});


module.exports = eventRoutes