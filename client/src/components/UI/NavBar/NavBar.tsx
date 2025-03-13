import { NavLink } from "react-router";
import $api from "../../../shared/axios.instance";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../../redux/slice/api.slice";
import { logout } from "../../../redux/slice/auth.slice";

function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
const [logoutUser] = useLogoutUserMutation();
  const { user } = useSelector((state: RootState) => state.authSlicer);
  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout())
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <><p>{user?.login && "parent"}</p>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/event">Мероприятия</NavLink>
      <NavLink to="/link">Полезные ссылки</NavLink>
      <NavLink to="/map">Карты</NavLink>
      <NavLink to="/gadget">Гаджеты</NavLink>
      <NavLink to="/profile">Профиль</NavLink>
      {user ? (
        <button onClick={handleLogout}>logout</button>
      ) : (
        <NavLink to="/auth">Регистрация</NavLink>
      )}
    </>
  );
}

export default NavBar;
