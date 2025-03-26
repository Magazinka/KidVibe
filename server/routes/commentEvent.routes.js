const commentEventRoutes = require("express").Router();
const { eventComment, User, event } = require("../db/models");

commentEventRoutes.get("/", async (req, res) => {
  try {
    const { eventId, userId } = req.query;
    const comment = await eventComment.findAll({
      where: { event_id: Number(eventId) },
      attributes: ["id", "text", "createdAt"],
      include: [
        {
          model: User,
          as: "authorComment",
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

commentEventRoutes.post("/", async (req, res) => {
  try {
    const { user_id, text, event_id, createdAt } = req.body;

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
    res.status(200).json({ message: "Комментарий удален" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Ошибка при удалении записи" });
  }
});
commentEventRoutes.put("/", async (req, res) => {
  try {
    const { id, text } = req.body; 

    const user_id = res.locals.user.id;

    if (!id || !text) {
      return res.status(400).json({ message: "Нет данных для редактирования" });
    }


    const userComment = await eventComment.findOne({
      where: { id: Number(id) },
    });

    if (!userComment) {
      return res.status(404).json({ message: "Комментарий не найден" });
    }

    if (Number(user_id) !== userComment.user_id) {
      return res.status(403).json({
        message: "У вас нет прав на редактирование этого комментария",
      });
    }

    userComment.text = text;
    console.log("userComment: ", userComment);


    await userComment.save();


    res
      .status(200)
      .json({ message: "Комментарий обновлен", comment: userComment });
  } catch (error) {
    console.error("Ошибка при редактировании комментария:", error); 
    res.status(500).json({ message: "Ошибка при редактировании комментария" });
  }
});

module.exports = commentEventRoutes;
