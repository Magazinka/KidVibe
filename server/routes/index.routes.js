const indexRouter = require("express").Router();
const authRoutes = require("./auth.routes");
const tokensRouter = require("./tokens.routes");
const eventRoutes = require("./event.routes");
const gadgetRoutes = require("./gadget.routes")
const announcementRoutes = require("./announcement.routes");
const linkRoutes = require("./link.routes");
const signupEvent = require("./signupEvent.routes")

indexRouter.use("/auth", authRoutes);
indexRouter.use("/tokens", tokensRouter);
indexRouter.use("/event", eventRoutes);
indexRouter.use("/gadget", gadgetRoutes)
indexRouter.use("/announcement" , announcementRoutes)
indexRouter.use("/link", linkRoutes)

module.exports = indexRouter; 
