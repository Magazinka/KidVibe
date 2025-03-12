// const jwt = require("jsonwebtoken");
// const jwtConfig = require("./jwt.config");

// function generateToken(payload) {
//   console.log("GENERATE TOKEN: ", payload);
//   return {
//     accessToken: jwt.sign(payload, "access-secret", {
//       expiresIn: jwtConfig.access.expiresIn,
//     }),
//     refreshToken: jwt.sign(payload, "refresh-secret", {
//       expiresIn: jwtConfig.refresh.expiresIn,
//     }),
//   };
// }

// module.exports = generateToken;

import jwt from "jsonwebtoken";
import jwtConfig from "./jwt.config.js";

const generateToken = (payload) => {
  const accessToken = jwt.sign(payload, jwtConfig.access.secret, {
    expiresIn: jwtConfig.access.expiresIn,
  });
  const refreshToken = jwt.sign(payload, jwtConfig.refresh.secret, {
    expiresIn: jwtConfig.refresh.expiresIn,
  });
  return { accessToken, refreshToken };
};

export default generateToken;