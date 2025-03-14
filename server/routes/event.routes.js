const eventRoutes = require("express").Router();
const { event } = require("../db/models");

eventRoutes.get("/", async (req, res) => {
  console.log("true connect");
  try {
    console.log("WORK");
    const allEvent = await event.findAll();
    console.log("allEvent: ", allEvent);
    res.status(200).json(allEvent);
  } catch (error) {
    console.log("error event get: ", error);
    res.status(400).json({ message: error });
  }
});

module.exports = eventRoutes;
