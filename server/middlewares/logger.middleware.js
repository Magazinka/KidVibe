const logger = (req, _, next) => {
  try {
    const message = `METHOD: ${req.method}, URL: ${req.url}`;
    console.log(message);
    next();
  } catch (error) {
    console.log("ERR: ", error);
  }
};

module.exports = logger;
