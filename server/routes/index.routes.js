// const indexRouter = require("express").Router();
// const authRoutes = require("./auth.routes");
// const tokensRouter = require("./tokens.routes");

// indexRouter.use("/auth", authRoutes);
// indexRouter.use("/tokens", tokensRouter);

// module.exports = indexRouter;
import { Router } from "express"; // Импортируем Router из express
import authRoutes from "./auth.routes.js"; // Импортируем authRoutes
import tokensRouter from "./tokens.routes.js"; // Импортируем tokensRouter

const indexRouter = Router(); // Создаем роутер

// Подключаем роуты
indexRouter.use("/auth", authRoutes);
indexRouter.use("/tokens", tokensRouter);

export default indexRouter; // Экспортируем роутер