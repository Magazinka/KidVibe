const tokensRouter = require("express").Router();
const verifyRefreshToken = require("../middlewares/verify.refresh.token");
const generateToken = require("../shared/generate.token");
const jwtConfig = require("../shared/jwt.config");

tokensRouter.get("/refresh", verifyRefreshToken, async (req, res) => {
  try {
    const { accessToken, refreshToken } = generateToken({
      user: res.locals.user,
    });
    console.log("Generated accessToken:", accessToken);
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ accessToken, user: res.locals.user });
  } catch (error) {
    console.log("Error generating token:", error);
    res.status(500).json({ message: "Error generating token" });
  }
});

module.exports = tokensRouter;
