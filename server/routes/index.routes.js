const indexRouter = require("express").Router();
const authRoutes = require("./auth.routes");
const tokensRouter = require("./tokens.routes");

indexRouter.use("/auth", authRoutes);
indexRouter.use("/tokens", tokensRouter);

module.exports = indexRouter;
