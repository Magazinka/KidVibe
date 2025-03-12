import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const corsConf = {
  allowedHeaders: ["Content-Type", "Authorization"],
  origin: ["http://localhost:5173", "http://localhost:5174"],
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

export default serverConfig;