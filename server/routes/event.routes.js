const eventRoutes = require("express").Router();
const { Event } = require("../db/models");

eventRoutes.get("/", async (req, res) => {
  try {
    console.log("WORK");
    const allEvent = await Event.findAll();
    console.log("allEvent: ", allEvent);
    res.status(200).json(allEvent);
  } catch (error) {
    console.log("error event get: ", error);
    res.status(400).json({ message: error });
  }
});

module.exports = eventRoutes;
