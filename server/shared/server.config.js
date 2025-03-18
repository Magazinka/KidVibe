const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const corsConf = {
  allowedHeaders: ["Content-Type", "Authorization"],
  origin: ["http://localhost:5173", "http://localhost:5174", "http://45.12.229.234", "kid-vibe.ru"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

const serverConfig = (app) => {
  try {
    app.use(cors(corsConf));
    app.use(express.json());
    app.use(cookieParser("secret"));
  } catch (error) {
    console.log("error server config: ", error);
  }
};

module.exports = serverConfig;
