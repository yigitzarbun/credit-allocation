import "./App.css";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import Header from "./components/Header";
// import Login from "./components/Login";
import Login_2 from "./components/Login_2";
function App() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* <Header /> */}
      <nav>
        <NavLink to="/" className={({ isActive }) => isActive && "active"}>Bank</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>
      <Routes>
        <Route path="/login" element={<Login_2 />} />
      </Routes>
    </div>
  );
}

export default App;
