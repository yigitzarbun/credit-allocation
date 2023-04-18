import React from "react";
import { NavLink } from "react-router-dom";
function Header() {
  return (
    <div className="flex justify-between">
      <h1>Bank Logo</h1>
      <nav className="flex justify-between w-1/4">
        <NavLink to="/">Dashboard</NavLink>

        <button>Logout</button>
      </nav>
    </div>
  );
}

export default Header;
