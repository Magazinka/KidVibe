require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/index.routes");
const app = express();

const PORT = 3001;

app.use("/", indexRouter);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
