import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'

function App() {
  

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
      {/* <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes> */}
    </BrowserRouter>
  )
}

export default App
