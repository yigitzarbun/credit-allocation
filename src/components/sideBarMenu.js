import React, { useEffect } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getUserFromLs, LOGOUT } from "../redux-stuff/actions";
import { useDispatch, useSelector } from "react-redux";
//import logo1 from "../logo.png";
const SideBar = () => {
  const user = useSelector((store) => store.user);
  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  let userType = "";
  if (user) {
    userType = user.role_name;
  }
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/login");
  };
  return (
    <div className=" bg-white h-screen p5 text-ternanry pt-8 p-4">
      <ul className="pt-2">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " bg-yellow-700 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
              : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6"
          }
        >
          <span>
            <RiDashboardLine />
          </span>
          <span>Dashboard</span>
        </NavLink>
        <li
          onClick={() => setSubMenuOpen(!subMenuOpen)}
          className=" text-lg flex justify-between items-center  gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6"
        >
          <span className="flex  gap-x-4 items-center">
            <span>
              <BsFillClipboardDataFill />
            </span>
            <span className="cursor-pointer">Tablolar</span>
          </span>

          <span>
            <BsChevronDown className="cursor-pointer" />
          </span>
        </li>

        {subMenuOpen && (
          <ul>
            <NavLink
              to="/unprocessed-loan-requests"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-yellow-700 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                  : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6"
              }
            >
              Müşteri Listesi
            </NavLink>
            <NavLink
              to="/sectors"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-yellow-700 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                  : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6"
              }
            >
              Sektörler
            </NavLink>
            <NavLink
              to="/occupations"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-yellow-700 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                  : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6"
              }
            >
              Meslekler
            </NavLink>
            <NavLink
              to="/processed-loan-requests"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-yellow-700 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                  : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6"
              }
            >
              İşlenmiş Müşteri Listesi
            </NavLink>
          </ul>
        )}
        {userType === "admin" && (
          <>
            <NavLink
              to="employees"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-yellow-700 text-black text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                  : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6"
              }
            >
              <span>
                <GrUserWorker />
              </span>
              <span>Çalışanlar</span>
            </NavLink>
            <NavLink
              to="/prioritization"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-yellow-700 text-black text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                  : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6"
              }
            >
              <span>Önceliklendirme</span>
            </NavLink>
          </>
        )}
      </ul>
      <div className={subMenuOpen === false ? "mt-80 p-2" : " mt-12 p-2 "}>
        {user && (
          <div>
            <p>{user && user.role_name.toUpperCase()}</p>
            <p className=" text-sm text-slate-500 ">{user && user.email}</p>
          </div>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className=" bg-red-300 text-red-700 px-14 py-2 rounded-md mt-6 "
          >
            Çıkış
          </button>
        )}
      </div>
    </div>
  );
};
export default SideBar;
