import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import EventPage from "./components/pages/EventPage/EventPage";
import GadgetPage from "./components/pages/GadgetPage/GadgetPage";
import LinkPage from "./components/pages/LinkPage/LinkPage";
import MainPage from "./components/pages/MainPage/MainPage";
import MapPage from "./components/pages/MapPage/MapPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import NavBar from "./components/UI/NavBar/NavBar";
import { loginUser } from "./redux/slice/auth.slice";
import $api from "./shared/axios.instance";
import OneCard from "./components/UI/OneCard/OneCard";
import OneGadget from "./components/UI/OneGadget/OneGadget";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    $api("/refresh")
      .then((response) => {
        const { accessToken, user } = response.data;
        dispatch(loginUser({ user, accessToken }));
      })
      .catch((error) => {
        console.log("Error refreshing token: ", error);
      });
  }, [dispatch]);

  console.log(import.meta.env.VITE_URL);
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/event/:id" element={<OneCard />} />
          <Route path="/link" element={<LinkPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/gadget" element={<GadgetPage />} />
          <Route path="/gadget/:id" element={<OneGadget />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Route>
      </Routes>
      {/* <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
