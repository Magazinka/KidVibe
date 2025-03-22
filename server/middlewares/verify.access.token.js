const jwt = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    console.log('accessToken VERY: ', accessToken);
    const { user } = jwt.verify(accessToken, "access-secret");
    console.log(`Тот саммый user=>`, user);
    res.locals.user = user;

    next();
  } catch (error) {
    console.log("Invalid access token");
    res.status(403).send("Invalid access token");
  }
}

module.exports = verifyAccessToken;
