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
// import jwt from "jsonwebtoken";
// import jwtConfig from "../shared/jwt.config.js";

// const verifyRefreshToken = (req, res, next) => {
//   const token = req.cookies.refreshToken;

//   if (!token) {
//     return res.status(401).json({ message: "Refresh token is missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, jwtConfig.refresh.secret);
//     res.locals.user = decoded.user; // Сохраняем пользователя в res.locals
//     next();
//   } catch (error) {
//     console.log("Error verifying refresh token:", error);
//     res.status(401).json({ message: "Invalid refresh token" });
//   }
// };

// export default verifyRefreshToken;