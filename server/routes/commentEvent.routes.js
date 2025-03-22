const commentEventRoutes = require("express").Router();
const { eventComment, User } = require("../db/models");

commentEventRoutes.get("/", async (req, res) => {
  console.log("comment/ ");
  try {
    const { eventId, userId } = req.query;
    console.log("userId comment: ", userId);
    const comment = await eventComment.findAll();
    console.log("comment: ", comment);
    const author = await User.findAll({
      attributes: ["id", "login"],
      include: {
        model: eventComment,
        as: "authorComment",
        attributes: [],
        where: { id: userId },
      },
    });
    console.log("author: ", author);
    res.status(200).json(comment);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ message: "error get comment" });
  }
});

commentEventRoutes.post("/", async (req, res) => {
  try {
    const { user_id, text, event_id } = req.body;
    console.log('event_id: ', event_id);
    console.log("user_id comment: ", user_id);

    const commentCreate = await eventComment.create({
      user_id,
      event_id,
      text,
    });
    console.log("commentCreate: ", commentCreate);
    const comment = commentCreate.get();
    delete comment.createdAt;
    delete comment.updatedAt;

    res.status(200).json(comment);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ message: "Error create comment" });
  }
});

module.exports = commentEventRoutes;
