// const authRoutes = require("express").Router();
// const bcrypt = require("bcrypt");
// const { User } = require("../db/models");
// const generateToken = require("../shared/generate.token");
// const jwtConfig = require("../shared/jwt.config");

// authRoutes.post("/signup", async (req, res) => {
//   try {
//     // console.log("REQ.BODY: ", req.body);
//     const { login, email, password } = req.body;
//     if (!login || !email || !password) {
//       return res.status(400).end();
//     }
//     const hashPass = await bcrypt.hash(password, 10);
//     // console.log("hashPass: ", hashPass);
//     // console.log("login: ", login);
//     // console.log("hPass: ", password);
//     const [newUser, created] = await User.findOrCreate({
//       where: { email },
//       defaults: { login, email, password: hashPass },
//     });
//     if (!created) {
//       return res.status(400).end();
//     }
//     console.log("NEWUSER: ", newUser);
//     const user = newUser.get();
//     delete user.password;
//     delete user.updatedAt;
//     delete user.createdAt;

//     const { accessToken, refreshToken } = generateToken({ user });
//     console.log("acc: ", accessToken);

//     return res
//       .cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         maxAge: jwtConfig.refresh.expiresIn,
//       })
//       .json({ accessToken, user });
//   } catch (error) {
//     console.log("error sign up: ", error);
//     return res.status(500).json({ message: "server err" });
//   }
// });

// authRoutes.post("/login", async (req, res) => {
//   try {
//     console.log("REQ.BODY: ", req.body);
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).end();
//     }
//     const user = await User.findOne({ where: { email } });
//     console.log("user: ", user);
//     if (!user) {
//       return res.status(400).end();
//     }

//     const isValid = await bcrypt.compare(password, user.password);
//     if (!isValid) {
//       return res.status(400).end();
//     }

//     const foundUser = user.get();
//     delete foundUser.password;
//     delete foundUser.updatedAt;
//     delete foundUser.createdAt;

//     const { accessToken, refreshToken } = generateToken({ user });
//     console.log("accessToken: ", accessToken);
//     console.log("REFRESH ", refreshToken);
//     res
//       .cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         maxAge: jwtConfig.refresh.expiresIn,
//       })
//       .json({ accessToken, user });
//   } catch (error) {
//     console.log("error login: ", error);
//   }
// });

// authRoutes.get("/logout", async (_, res) => {
//   try {
//     return res.clearCookie("refreshToken").status(200).end();
//   } catch (error) {
//     console.log("error logout: ", error);
//   }
// });

// module.exports = authRoutes;

import { Router } from "express"; 
import bcrypt from "bcrypt"; 
// import { User } from "../db/models"; 
import models from '../db/models/index.js';
import generateToken from "../shared/generate.token.js"; 
import jwtConfig from "../shared/jwt.config.js";

const authRoutes = Router(); 

// Роут для регистрации
authRoutes.post("/signup", async (req, res) => {
  const {User} = models
  try {
    const { login, email, password } = req.body;
    if (!login || !email || !password) {
      return res.status(400).end();
    }

    const hashPass = await bcrypt.hash(password, 10); // Хэшируем пароль
    const [newUser, created] = await User.findOrCreate({
      where: { email },
      defaults: { login, email, password: hashPass },
    });

    if (!created) {
      return res.status(400).end(); // Если пользователь уже существует
    }

    const user = newUser.get();
    delete user.password;
    delete user.updatedAt;
    delete user.createdAt;

    const { accessToken, refreshToken } = generateToken({ user }); // Генерируем токены

    return res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ accessToken, user });
  } catch (error) {
    console.log("error sign up: ", error);
    return res.status(500).json({ message: "server err" });
  }
});

// Роут для входа
authRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).end();
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).end(); // Если пользователь не найден
    }

    const isValid = await bcrypt.compare(password, user.password); // Проверяем пароль
    if (!isValid) {
      return res.status(400).end(); // Если пароль неверный
    }

    const foundUser = user.get();
    delete foundUser.password;
    delete foundUser.updatedAt;
    delete foundUser.createdAt;

    const { accessToken, refreshToken } = generateToken({ user }); // Генерируем токены

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: jwtConfig.refresh.expiresIn,
      })
      .json({ accessToken, user });
  } catch (error) {
    console.log("error login: ", error);
    return res.status(500).json({ message: "server err" });
  }
});

// Роут для выхода
authRoutes.get("/logout", async (_, res) => {
  try {
    return res.clearCookie("refreshToken").status(200).end();
  } catch (error) {
    console.log("error logout: ", error);
    return res.status(500).json({ message: "server err" });
  }
});

export default authRoutes; // Экспортируем роутер