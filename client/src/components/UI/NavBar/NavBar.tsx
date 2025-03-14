import { NavLink } from "react-router";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../../redux/slice/api.slice";
import { logout } from "../../../redux/slice/auth.slice";
import { Box, Button, Link, Typography } from "@mui/material";

// function NavBar() {
//   const dispatch = useDispatch<AppDispatch>();
//   const [logoutUser] = useLogoutUserMutation();
//   const { user } = useSelector((state: RootState) => state.authSlicer);
//   const handleLogout = async () => {
//     try {
//       await logoutUser();
//       dispatch(logout());
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };
//   return (
//     <>
//       <p>{user?.login && "parent"}</p>
//       <NavLink to="/">Главная</NavLink>
//       <NavLink to="/event">Мероприятия</NavLink>
//       <NavLink to="/link">Полезные ссылки</NavLink>
//       <NavLink to="/map">Карты</NavLink>
//       <NavLink to="/gadget">Гаджеты</NavLink>
//       <NavLink to="/profile">Профиль</NavLink>
//       {user == undefined ? (
//         <NavLink to="/auth">Регистрация</NavLink>
//       ) : (
//         <button onClick={handleLogout}>logout</button>
//       )}
//     </>
//   );
// }

// export default NavBar;

// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "../store";
// import { useLogoutUserMutation } from "../services/api";
// import { logout } from "../store/authSlice";
// import { Box, Button, Typography } from "@mui/material";
// import { NavLink } from "react-router-dom";

function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
  const [logoutUser] = useLogoutUserMutation();
  const { user } = useSelector((state: RootState) => state.authSlicer);

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        display: "flex",
        marginBottom: "10px",
        padding: "10px 30px",
        // flexDirection: "column",
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#F5F5F5", // Цвет фона страницы
      }}
    >
      {user?.login && (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Parent
        </Typography>
      )}

      {/* Навигационные кнопки */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#8174A0", // Цвет кнопки
              color: "#CFEBC7", // Цвет текста на кнопке
              fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
              "&:hover": {
                backgroundColor: "#441752", // Цвет кнопки при наведении
              },
            }}
            fullWidth
          >
            Главная
          </Button>
        </NavLink>
        <NavLink to="/event" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#8174A0", // Цвет кнопки
              color: "#CFEBC7", // Цвет текста на кнопке
              fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
              "&:hover": {
                backgroundColor: "#441752", // Цвет кнопки при наведении
              },
            }}
            fullWidth
          >
            Мероприятия
          </Button>
        </NavLink>
        <NavLink to="/link" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#8174A0", // Цвет кнопки
              color: "#CFEBC7", // Цвет текста на кнопке
              fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
              "&:hover": {
                backgroundColor: "#441752", // Цвет кнопки при наведении
              },
            }}
            fullWidth
          >
            Совет
          </Button>
        </NavLink>
        <NavLink to="/map" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#8174A0", // Цвет кнопки
              color: "#CFEBC7", // Цвет текста на кнопке
              fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
              "&:hover": {
                backgroundColor: "#441752", // Цвет кнопки при наведении
              },
            }}
            fullWidth
          >
            Карты
          </Button>
        </NavLink>
        <NavLink to="/gadget" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#8174A0", // Цвет кнопки
              color: "#CFEBC7", // Цвет текста на кнопке
              fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
              "&:hover": {
                backgroundColor: "#441752", // Цвет кнопки при наведении
              },
            }}
            fullWidth
          >
            Гаджеты
          </Button>
        </NavLink>
        <NavLink to="/profile" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#8174A0", // Цвет кнопки
              color: "#CFEBC7", // Цвет текста на кнопке
              fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
              "&:hover": {
                backgroundColor: "#441752", // Цвет кнопки при наведении
              },
            }}
            fullWidth
          >
            Профиль
          </Button>
        </NavLink>
      </Box>

      {/* Кнопка регистрации или выхода */}
      {user !== null ? (
         <Button
         variant="outlined"
         color="error"
         sx={{
           padding: "1px 10px",
           fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
         }}
         fullWidth
         onClick={handleLogout}
       >
         Logout
       </Button>
      ) : (
        <NavLink to="/auth" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#8174A0", // Цвет кнопки
            color: "#CFEBC7", // Цвет текста на кнопке
            fontFamily: "'Shantell Sans', sans-serif", // Шрифт для кнопки
            "&:hover": {
              backgroundColor: "#441752", // Цвет кнопки при наведении
            },
            padding: "5px 5px",
          }}
          fullWidth
        >
          Регистрация
        </Button>
      </NavLink>
       
      )}
    </Box>
  );
}

export default NavBar;
