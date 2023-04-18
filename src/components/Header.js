import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="flex justify-between">
      <p>test</p>
      <h1>Bank</h1>
      <nav className="flex justify-between w-1/4">
        <NavLink to="/">Dashboard</NavLink>

        <button>Logout</button>
      </nav>
    </div>
  );
}

export default Header;
