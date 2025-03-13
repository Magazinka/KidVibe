const jwt = require("jsonwebtoken");
const jwtConfig = require("./jwt.config");

function generateToken(payload) {
  console.log("GENERATE TOKEN: ", payload);
  return {
    accessToken: jwt.sign(payload, "access-secret", {
      expiresIn: jwtConfig.access.expiresIn,
    }),
    refreshToken: jwt.sign(payload, "refresh-secret", {
      expiresIn: jwtConfig.refresh.expiresIn,
    }),
  };
}

module.exports = generateToken;
