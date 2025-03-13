const indexRouter = require("express").Router();
const authRoutes = require("./auth.routes");
const tokensRouter = require("./tokens.routes");
const eventRoutes = require("./event.routes");

indexRouter.use("/auth", authRoutes);
indexRouter.use("/tokens", tokensRouter);
indexRouter.use("/event", eventRoutes);

module.exports = indexRouter;
