const signupEvent = require("express").Router();
const { event, User, userEvent } = require("../db/models");


signupEvent.get("/signup", async (req, res) => {
  const { eventId, userId } = req.query;
  console.log("req.query: ", req.query);
  console.log("userId: ", userId);
  console.log("eventId: ", eventId);

  try {
    const signups = await User.findAll({
      attributes: ["id", "login", "email"],
      include: {
        model: event,
        as: "attendees",
        attributes: [],
        where: { id: eventId },
      },
    });
    console.log("signups: ", signups);
    if (!signups) {
      res.status(400).json({ message: "err signups" });
    }

    return res.json(signups);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка при получении данных" });
  }
});

signupEvent.post("/signup", async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    console.log("req.body: ", req.body);

    if (!user_id || !event_id) {
      return res
        .status(400)
        .json({ message: "Ошибка: необходимо передать user_id и event_id" });
    }

    // const user = await User.findByPk(user_id);
    // if (!user) {
    //   return res
    //     .status(404)
    //     .json({ message: "Пользователь с таким ID не найден" });
    // }

    const eventExist = await event.findByPk(event_id);
    if (!eventExist) {
      return res
        .status(404)
        .json({ message: "Мероприятие с таким ID не найдено" });
    }
    const existingSignup = await userEvent.findOne({
      where: {
        user_id,
        event_id,
      },
    });

    if (existingSignup) {
      return res
        .status(400)
        .json({ message: "Вы уже зарегистрированы на это мероприятие" });
    }

    const signupCreate = await userEvent.create({
      user_id,
      event_id,
    });
    const signups = await User.findAll({
      attributes: ["id", "login", "email"],
      include: {
        model: event,
        as: "attendees",
        attributes: [],
        where: { id: event_id },
      },
    });
    // const card = signupCreate.get();
    // delete card.createdAt;
    // delete card.updatedAt;

    res.status(200).json(signups);
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Ошибка при создании записи" });
  }
});

signupEvent.post("/signup/attendees", async (req, res) => {
  try {
    // const { event_id } = req.body;
    const event_id = 1;

    if (!event_id) {
      return res.status(400).json({ message: "Необходимо передать event_id" });
    }

    const eventWithUsers = await event.findOne({
      where: { id: event_id },
      include: [
        {
          model: User,
          as: "attendees",
          attributes: ["login", "email"],
          through: { attributes: [] },
        },
      ],
    });
    console.log("eventWithUsers", eventWithUsers);
    if (eventWithUsers && eventWithUsers.Attendees.length > 0) {
      const usernames = eventWithUsers.Attendees.map((user) => user.login);
      res.status(200).json({ users: usernames });
    } else {
      res
        .status(404)
        .json({ message: "Нет пользователей, записанных на это мероприятие." });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Ошибка при получении данных", error });
  }
});
signupEvent.delete("/signup", async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    console.log("event_id: ", event_id);
    console.log("user_id: ", user_id);
    if (!user_id || !event_id) {
      return res
        .status(400)
        .json({ message: "Ошибка: необходимо передать user_id и event_id" });
    }
    const UserEvent = await userEvent.findOne({
      where: { user_id, event_id },
    });
    if (!UserEvent) {
      return res
        .status(404)
        .json({ message: "User is not signed up for this event." });
    }
    await UserEvent.destroy({
      where: {
        user_id,
        event_id,
      },
    });
    res.status(200).json({ message: "Вы успешно отписались от мероприятия" });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ message: "Ошибка при удалении записи" });
  }
});

module.exports = signupEvent;
