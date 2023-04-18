import React from "react";
import { RiDashboardLine } from "react-icons/ri";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { useState } from "react";
import { NavLink } from "react-router-dom";
//import logo1 from "../logo.png";
const SideBar = () => {
  const [userType, setUserType] = useState("superAdmin");
  const [subMenuOpen, setSubMenuOpen] = useState(false);

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
        <li className=" text-lg flex justify-between items-center  gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6">
          <span className="flex  gap-x-4 items-center">
            <span>
              <BsFillClipboardDataFill />
            </span>
            <span>Tables</span>
          </span>

          <span>
            <BsChevronDown onClick={() => setSubMenuOpen(!subMenuOpen)} />
          </span>
        </li>

        {subMenuOpen && (
          <ul>
            <NavLink
              to="/musterilistesi"
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
        {userType === "superAdmin" && (
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
        )}
      </ul>
      <div className={subMenuOpen === false ? "mt-80 p-2" : " mt-12 p-2 "}>
        <h4 className="text-lg mb-2">Profile</h4>
        <div>
          <p>Jhon Daniel</p>
          <p className=" text-sm text-slate-500 ">johndaniel@gmail.com</p>
        </div>
        <button className=" bg-red-300 text-red-700 px-14 py-2 rounded-md mt-6 ">
          Log out
        </button>
      </div>
    </div>
  );
};
export default SideBar;
