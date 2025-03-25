const jwt = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  console.log("accessToken VERY: ", req.headers.authorization.split(" ")[1]);
  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    const { user } = jwt.verify(accessToken, "access-secret");
    console.log(`Тот саммый user=>`, user);
    res.locals.user = user;

    next();
  } catch (error) {
    console.log("Invalid access token ", error);
    res.status(403).send("Invalid access token");
  }
}

module.exports = verifyAccessToken;
