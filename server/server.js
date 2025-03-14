require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/index.routes");
const verifyAccessToken = require("./middlewares/verify.access.token");
const serverConfig = require("./shared/server.config");
const app = express();

const PORT = 3001;

const { Sequelize } = require("sequelize");

// Использование строки подключения или параметров

serverConfig(app);
app.use("/", indexRouter);

app.get("/refresh", verifyAccessToken, (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  res.json({ message: "OK", accessToken, user: res.locals.user });
});
const sequelize = new Sequelize(
  "postgres://username:password@localhost:5432/mydatabase",
  {
    dialect: "postgres",
    logging: false, // если не нужно логирование
  }
);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
