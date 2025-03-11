const indexRouter = require("express").Router();
const authRoutes = require("./auth.routes");

indexRouter.use("/auth", authRoutes);
module.exports = indexRouter;
