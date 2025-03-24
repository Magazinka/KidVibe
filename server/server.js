require("dotenv").config();
const express = require("express");
const indexRouter = require("./routes/index.routes");
const verifyAccessToken = require("./middlewares/verify.access.token");
const serverConfig = require("./shared/server.config");
const app = express();

const PORT = 3001;

// const multer = require("multer")
// const cloudinary = require("cloudinary").v2
// const streamifier = require("streamifire")

// cloudinary.config({
//   cloud_name: "dlliagivo",
//   api_key: "212971461224372",
//   api_secret: "6jDh5g0JQjr31zs8GVQuhkriwVA",
//   secure: true,
// });

// const storage = multer.memoryStorage()



serverConfig(app);
app.use("/", indexRouter);

app.get("/refresh", verifyAccessToken, (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  res.json({ message: "OK", accessToken, user: res.locals.user });
});


app.listen(PORT, () => {
  console.log(`Server started on ${PORT} port`);
});
