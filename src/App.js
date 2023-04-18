import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
function App() {
  return (
    <div className=" mx-auto">
      <Dashboard />
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
