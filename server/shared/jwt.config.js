const jwtConfig = {
    access: {
      type: "accessToken",
      expiresIn: `${1000 * 5}`,
    },
    refresh: {
      type: "refreshToken",
      expiresIn: `${1000 * 60 * 60 * 12}`,
    },
  };
  
//   module.exports = jwtConfig;
// const jwtConfig = {
//   access: {
//     secret: process.env.ACCESS_TOKEN_SECRET,
//     expiresIn: "15m",
//   },
//   refresh: {
//     secret: process.env.REFRESH_TOKEN_SECRET,
//     expiresIn: "7d",
//   },
// };

// export default jwtConfig;