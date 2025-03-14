import { useState } from "react";
import Signup from "../../UI/SignUp/SignUp";
import Login from "../../UI/Login/Login";
import { Button, Box } from "@mui/material";

function AuthPage() {
  const [toggle, setToggle] = useState(<Signup />);

  function toggleSignUp() {
    setToggle(<Signup />);
  }

  function toggleLogin() {
    setToggle(<Login />);
  }

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#F5F5F5", // Цвет фона страницы
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          onClick={toggleLogin}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#8174A0", // Цвет кнопки
            color: "#CFEBC7", // Цвет текста на кнопке
            fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
            "&:hover": {
              backgroundColor: "#441752", // Цвет кнопки при наведении
            },
            padding: "10px 20px",
          }}
        >
          Login
        </Button>
        <Button
          onClick={toggleSignUp}
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#8174A0", // Цвет кнопки
            color: "#CFEBC7", // Цвет текста на кнопке
            fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
            "&:hover": {
              backgroundColor: "#441752", // Цвет кнопки при наведении
            },
            padding: "10px 20px",
          }}
        >
          Sign Up
        </Button>
      </Box>
      {toggle}
    </Box>
  );
}

export default AuthPage;
