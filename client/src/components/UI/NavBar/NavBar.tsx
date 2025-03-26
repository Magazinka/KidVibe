import { NavLink } from "react-router";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../../redux/slice/api.slice";
import { logout } from "../../../redux/slice/auth.slice";
import { Box, Button } from "@mui/material";

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
        maxWidth: 870,
        margin: "auto",
        display: "flex",
        marginBottom: "10px",
        padding: "10px 30px",
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#F5F5F5",
        alignItems: "center", // Добавлено для вертикального выравнивания
      }}
    >
      <Box sx={{ display: "flex", gap: 1, flexGrow: 1, alignItems: "center" }}>
        <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://res.cloudinary.com/dlliagivo/image/upload/v1742999929/logo_navbar.png"
            alt="Logo"
            style={{
              height: "40px",
              width: "auto",
              padding: "1px",
              marginRight: "25px",
            }}
          />
        </NavLink>
        
        <Box sx={{ display: "flex", gap: 1, flexGrow: 1 }}>
          <NavLink to="/" style={{ textDecoration: "none", flex: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#8174A0",
                color: "#CFEBC7",
                fontFamily: "'Shantell Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#441752",
                },
                width: "100%",
                height: "40px", // Фиксированная высота
              }}
            >
              Главная
            </Button>
          </NavLink>
          <NavLink to="/event" style={{ textDecoration: "none", flex: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#8174A0",
                color: "#CFEBC7",
                fontFamily: "'Shantell Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#441752",
                },
                width: "100%",
                height: "40px",
              }}
            >
              Мероприятия
            </Button>
          </NavLink>
          <NavLink to="/link" style={{ textDecoration: "none", flex: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#8174A0",
                color: "#CFEBC7",
                fontFamily: "'Shantell Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#441752",
                },
                width: "100%",
                height: "40px",
              }}
            >
              Совет
            </Button>
          </NavLink>
          <NavLink to="/map" style={{ textDecoration: "none", flex: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#8174A0",
                color: "#CFEBC7",
                fontFamily: "'Shantell Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#441752",
                },
                width: "100%",
                height: "40px",
              }}
            >
              Карты
            </Button>
          </NavLink>
          <NavLink to="/gadget" style={{ textDecoration: "none", flex: 1 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#8174A0",
                color: "#CFEBC7",
                fontFamily: "'Shantell Sans', sans-serif",
                "&:hover": {
                  backgroundColor: "#441752",
                },
                width: "100%",
                height: "40px",
              }}
            >
              Гаджеты
            </Button>
          </NavLink>
        </Box>
      </Box>

      {user !== null ? (
        <Button
          variant="outlined"
          color="error"
          sx={{
            fontFamily: "'Shantell Sans', sans-serif",
            minWidth: "120px",
            height: "40px", // Такая же высота как у других кнопок
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <NavLink to="/auth" style={{ textDecoration: "none", minWidth: "120px" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#8174A0",
              color: "#CFEBC7",
              fontFamily: "'Shantell Sans', sans-serif",
              "&:hover": {
                backgroundColor: "#441752",
              },
              width: "100%",
              height: "40px", // Такая же высота как у других кнопок
            }}
          >
            Регистрация
          </Button>
        </NavLink>
      )}
    </Box>
  );
}

export default NavBar;