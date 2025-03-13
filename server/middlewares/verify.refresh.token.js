const jwt = require("jsonwebtoken");

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;
    const { user } = jwt.verify(refreshToken, "refresh-secret");
    console.log('user refresh: ', user);
    res.locals.user = user;
    next();
  } catch (error) {
    console.log("Invalid refresh token", error);
    res.status(403).send("Invalid refresh token");
  }
}

module.exports = verifyRefreshToken;
