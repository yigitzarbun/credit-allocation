import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GET_USER, LOGOUT } from "../redux-stuff/actions";

function Header() {
  let { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/login");
  };
  useEffect(() => {
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div className="flex justify-between p-4 items-center">
      <Link to="/" className="flex items-center">
        <img
          src="/images/logo.png"
          alt="logo"
          className="w-12 h-12 mr-2 cursor-pointer"
        />
        <h1 className="text-blue-400 font-bold text-4xl italic cursor-pointer hover:text-white ">
          Neptune
        </h1>
      </Link>
      <nav>
        {user && (
          <button
            onClick={handleLogout}
            className="hover:bg-red-500 border-2 border-red-500 text-white px-4 py-2 rounded-md font-bold text-sm"
          >
            Çıkış
          </button>
        )}
      </nav>
    </div>
  );
}

export default Header;
