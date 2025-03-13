const tokensRouter = require("express").Router();
const verifyRefreshToken = require("../middlewares/verify.refresh.token");
const generateToken = require("../shared/generate.token");
const jwtConfig = require("../shared/jwt.config");

tokensRouter.get("/refresh", verifyRefreshToken, async (req, res) => {
  try {
    const { accessToken, refreshToken } = generateToken({
      user: res.locals.user,
    });
    console.log("Generated accessToken:", accessToken);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ accessToken, user: res.locals.user });
  } catch (error) {
    console.log("Error generating token:", error);
    res.status(500).json({ message: "Error generating token" });
  }
});

module.exports = tokensRouter;
// import { Router } from "express"; // Импортируем Router из express
// import verifyRefreshToken from "../middlewares/verify.refresh.token.js"; // Импортируем middleware
// import generateToken from "../shared/generate.token.js"; // Импортируем функцию generateToken
// import jwtConfig from "../shared/jwt.config.js"; // Импортируем конфигурацию JWT

// const tokensRouter = Router(); // Создаем роутер

// // Роут для обновления токенов
// tokensRouter.get("/refresh", verifyRefreshToken, async (req, res) => {
//   try {
//     const { accessToken, refreshToken } = generateToken({
//       user: res.locals.user, // Используем пользователя из res.locals
//     });

//     console.log("Generated accessToken:", accessToken);

//     res
//       .cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         maxAge: jwtConfig.refresh.expiresIn,
//       })
//       .json({ accessToken, user: res.locals.user });
//   } catch (error) {
//     console.log("Error generating token:", error);
//     res.status(500).json({ message: "Error generating token" });
//   }
// });

// export default tokensRouter; // Экспортируем роутер