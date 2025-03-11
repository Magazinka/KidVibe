import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/pages/AuthPage/AuthPage";
import MainPage from "./components/pages/MainPage/MainPage";
import NavBar from "./components/UI/NavBar/NavBar";
import EventPage from "./components/pages/EventPage/EventPage";
import LinkPage from "./components/pages/LinkPage/LinkPage";
import MapPage from "./components/pages/MapPage/MapPage";
import GadgetPage from "./components/pages/GadgetPage/GadgetPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";

function App() {
  
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/link" element={<LinkPage />} />
          <Route path="/map" element={<MapPage/>}/>
          <Route path="/gadget" element={<GadgetPage />} />
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
