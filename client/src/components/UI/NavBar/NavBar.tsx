import { NavLink } from "react-router";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../../redux/slice/api.slice";
import { logout } from "../../../redux/slice/auth.slice";
import { Box, Button, Typography } from "@mui/material";

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
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#F5F5F5",
      }}
    >
      {user?.login && (
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Parent
        </Typography>
      )}

      <Box sx={{ display: "flex", gap: 1 }}>
        <NavLink to="/" style={{ textDecoration: "none" }}>
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
              backgroundColor: "#8174A0",
              color: "#CFEBC7",
              fontFamily: "'Shantell Sans', sans-serif",
              "&:hover": {
                backgroundColor: "#441752",
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
              backgroundColor: "#8174A0",
              color: "#CFEBC7",
              fontFamily: "'Shantell Sans', sans-serif",
              "&:hover": {
                backgroundColor: "#441752",
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
              backgroundColor: "#8174A0",
              color: "#CFEBC7",
              fontFamily: "'Shantell Sans', sans-serif",
              "&:hover": {
                backgroundColor: "#441752",
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
              backgroundColor: "#8174A0",
              color: "#CFEBC7",
              fontFamily: "'Shantell Sans', sans-serif",
              "&:hover": {
                backgroundColor: "#441752",
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
              backgroundColor: "#8174A0",
              color: "#CFEBC7",
              fontFamily: "'Shantell Sans', sans-serif",
              "&:hover": {
                backgroundColor: "#441752",
              },
            }}
            fullWidth
          >
            Профиль
          </Button>
        </NavLink>
      </Box>

      {user !== null ? (
        <Button
          variant="outlined"
          color="error"
          sx={{
            padding: "1px 10px",
            fontFamily: "'Shantell Sans', sans-serif",
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
              backgroundColor: "#8174A0",
              color: "#CFEBC7",
              fontFamily: "'Shantell Sans', sans-serif",
              "&:hover": {
                backgroundColor: "#441752",
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
