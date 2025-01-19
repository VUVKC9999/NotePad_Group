import "./App.css";
import HomePageComponent from "./components/HomePageComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  return <>
    <Router>
      <div>
        {/* <HomePageComponent/> */}
        <Routes>
        <Route path="/" element={<LoginComponent/>}></Route>
          <Route path="/login" element={<LoginComponent/>}></Route>
          <Route path="/register" element={<RegisterComponent/>}></Route>
          <Route path="/dashboard" element={<HomePageComponent/>}></Route>
        </Routes>
      </div>
    </Router>
  </>;
}

export default App;