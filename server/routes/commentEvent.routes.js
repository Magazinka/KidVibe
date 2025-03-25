const commentEventRoutes = require("express").Router();
const { where } = require("sequelize");
const { eventComment, User, event } = require("../db/models");

commentEventRoutes.get("/", async (req, res) => {
  // console.log("comment/ ");
  try {
    const { eventId, userId } = req.query;
    // console.log("userId comment: ", userId);
    const comment = await eventComment.findAll({
      where: { event_id: Number(eventId) },
      attributes: ["id", "text"],
      include: [
        {
          model: User,
          as: "authorComment",
          attributes: ["id", "login"],
        },
      ],
    });

    // console.log("comment: ", comment);

    res.status(200).json(comment);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ message: "error get comment" });
  }
});

commentEventRoutes.post("/", async (req, res) => {
  try {
    const { user_id, text, event_id } = req.body;
    // console.log("event_id: ", event_id);
    // console.log("user_id comment: ", user_id);

    const commentCreate = await eventComment.create({
      user_id,
      event_id,
      text,
    });
    const comment = await eventComment.findAll({
      where: { event_id },
      attributes: ["id", "text"],
      include: [
        {
          model: User,
          as: "authorComment",
          attributes: ["id", "login"],
        },
      ],
    });
    // console.log("commentCreate: ", comment);
    // const comment = commentCreate.get();
    // delete comment.createdAt;
    // delete comment.updatedAt;

    res.status(200).json(comment);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ message: "Error create comment" });
  }
});

commentEventRoutes.delete("/", async (req, res) => {
  try {
    const { id, user_id } = req.body;
    if (!id || !user_id) {
      return res.status(400).json({ message: "Нет юзера или коммента" });
    }
    const userComment = await eventComment.findOne({
      where: { id: Number(id) },
    });
    if (!userComment) {
      return res.status(400).json({ message: "Не получилось удалить коммент" });
    }
    console.log("userComment: ", userComment);
    if (Number(user_id) === userComment.user_id) {
      await userComment.destroy({
        where: {
          id: Number(id),
          user_id: Number(user_id),
        },
      });
    }

    // console.log("userComment: ", userComment);

    res.status(200).json({ message: "Комментарий удален" });
    // console.log("REQ BODY COMMENT: ", req.body);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Ошибка при удалении записи" });
  }
});

module.exports = commentEventRoutes;
