import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/pages/AuthPage/AuthPage";

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route>
          <Route path="/" element={<AuthPage />} />
        </Route>
      </Routes>
      {/* <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes> */}
    </BrowserRouter>
  );
}

export default App;
