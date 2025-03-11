import { NavLink } from "react-router";

function NavBar() {
  return (
    <>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/event">Мероприятия</NavLink>
      <NavLink to="/link">Полезные ссылки</NavLink>
      <NavLink to="/map">Карты</NavLink>
      <NavLink to="/gadget">Гаджеты</NavLink>
      <NavLink to="/profile">Профиль</NavLink>
      <NavLink to="/auth">Регистрация</NavLink>
    </>
  );
}

export default NavBar;
