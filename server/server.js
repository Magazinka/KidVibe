require("dotenv").config();
// import dotenv from "dotenv";
// dotenv.config();
const express = require("express");
const indexRouter = require("./routes/index.routes");
const verifyAccessToken = require("./middlewares/verify.access.token");
const serverConfig = require("./shared/server.config");
const app = express();

const PORT = 3001;

serverConfig(app)
app.use("/", indexRouter);

app.get("/refresh", verifyAccessToken, (req, res) => {
    const accessToken = req.headers.authorization.split(" ")[1];
    res.json({ message: "OK", accessToken, user: res.locals.user });
  });

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import indexRouter from "./routes/index.routes.js"; 
// import verifyAccessToken from "./middlewares/verify.access.token.js";
// import serverConfig from "./shared/server.config.js";

// const app = express();
// const PORT = 3001;

// serverConfig(app);


// app.use("/", indexRouter);


// app.get("/refresh", verifyAccessToken, (req, res) => {
//     const accessToken = req.headers.authorization.split(" ")[1];
//     res.json({ message: "OK", accessToken, user: res.locals.user });
// });

// app.listen(PORT, () => {
//     console.log(`Server started on ${PORT} port`);
// });