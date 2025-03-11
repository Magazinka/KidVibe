import { useState } from "react";
import Signup from "../../UI/SignUp/SignUp";
import Login from "../../UI/Login/Login";

function AuthPage() {
  const [toggle, setToggle] = useState(<Signup />);
  function toggleSignUp() {
    setToggle(<Signup />);
  }
  function toggleLogin() {
    setToggle(<Login />);
  }
  return (
    <div>
      <button onClick={toggleLogin}>Login</button>
      <button onClick={toggleSignUp}>Sign Up</button>
      {toggle}
    </div>
  );
}

export default AuthPage;
