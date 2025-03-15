const indexRouter = require("express").Router();
const authRoutes = require("./auth.routes");
const tokensRouter = require("./tokens.routes");
const eventRoutes = require("./event.routes");
const announcementRoutes = require("./announcement.routes")

indexRouter.use("/auth", authRoutes);
indexRouter.use("/tokens", tokensRouter);
indexRouter.use("/event", eventRoutes);
indexRouter.use("/announcement" , announcementRoutes)

module.exports = indexRouter;
