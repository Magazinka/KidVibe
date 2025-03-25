const indexRouter = require("express").Router();
const authRoutes = require("./auth.routes");
const tokensRouter = require("./tokens.routes");
const eventRoutes = require("./event.routes");
const gadgetRoutes = require("./gadget.routes");
const announcementRoutes = require("./announcement.routes");
const linkRoutes = require("./link.routes");
const signupEvent = require("./signupEvent.routes");
const verifyAccessToken = require("../middlewares/verify.access.token");
const commentEventRouter = require("./commentEvent.routes");

indexRouter.use("/auth", authRoutes);
indexRouter.use("/tokens", tokensRouter);
indexRouter.use("/event", verifyAccessToken, eventRoutes);
indexRouter.use("/gadget", verifyAccessToken, gadgetRoutes);
indexRouter.use("/announcement", announcementRoutes);
indexRouter.use("/link", verifyAccessToken, linkRoutes);
indexRouter.use("/event/:id", verifyAccessToken, signupEvent);
indexRouter.use("/event/:id/comment", commentEventRouter);

module.exports = indexRouter;
