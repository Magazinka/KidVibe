const commentGadgetRoutes = require("express").Router();
const { where } = require("sequelize");
const { gadgetComment, User, gadget } = require("../db/models");

commentGadgetRoutes.get("/", async (req, res) => {
  try {
    const { gadgetId, userId } = req.query;
    const comment = await gadgetComment.findAll({
      where: { gadget_id: Number(gadgetId) },
      attributes: ["id", "text"],
      include: [
        {
          model: User,
          as: "authorCommentGadget",
          attributes: ["id", "login"],
        },
      ],
    });

    res.status(200).json(comment);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ message: "error get comment" });
  }
});

commentGadgetRoutes.post("/", async (req, res) => {
  try {
    const { user_id, text, gadget_id } = req.body;

    const commentCreate = await gadgetComment.create({
      user_id,
      gadget_id,
      text,
    });
    const comment = await gadgetComment.findAll({
      where: { gadget_id },
      attributes: ["id", "text"],
      include: [
        {
          model: User,
          as: "authorCommentGadget",
          attributes: ["id", "login"],
        },
      ],
    });

    res.status(200).json(comment);
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ message: "Error create comment" });
  }
});

commentGadgetRoutes.delete("/", async (req, res) => {
  try {
    const { id, user_id } = req.body;
    if (!id || !user_id) {
      return res.status(400).json({ message: "Нет юзера или коммента" });
    }
    const userComment = await gadgetComment.findOne({
      where: { id: Number(id) },
    });
    if (!userComment) {
      return res.status(400).json({ message: "Не получилось удалить коммент" });
    }
    if (Number(user_id) === userComment.user_id) {
      await userComment.destroy({
        where: {
          id: Number(id),
          user_id: Number(user_id),
        },
      });
    }

    res.status(200).json({ message: "Комментарий удален" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Ошибка при удалении записи" });
  }
});

module.exports = commentGadgetRoutes;