import React, { useEffect } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { BsFillClipboardDataFill } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  getOccupations,
  getSectors,
  getUsers,
  GET_USER,
  LOGOUT,
} from "../redux-stuff/actions";
import { useDispatch, useSelector } from "react-redux";
//import logo1 from "../logo.png";
const SideBar = () => {
  const { user, users, sectors, occupations } = useSelector((store) => store);
  let userType = "";
  let missingSectorScores = null;
  let missingOccupationScores = null;
  if (sectors) {
    missingSectorScores = sectors.filter((s) => s.sector_score === 0).length;
  }

  if (occupations) {
    missingOccupationScores = occupations.filter(
      (o) => o.occupation_score === 0
    ).length;
  }
  if (
    users &&
    user &&
    users != null &&
    user != null &&
    Array.isArray(users) & (users.length > 0)
  ) {
    userType = users.filter((u) => u.email === user.email)[0]["role_name"];
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    navigate("/login");
  };

  useEffect(() => {
    dispatch(getUsers());
    dispatch({ type: GET_USER });
    dispatch(getSectors());
    dispatch(getOccupations());
  }, []);
  return (
    <div className="bg-[#1C1C20] p5 text-ternanry pt-8 p-4 rounded-md">
      <ul className="pt-2">
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? " bg-blue-500 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6"
              : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6  hover:text-blue-500"
          }
        >
          <span>
            <RiDashboardLine />
          </span>
          <span>Dashboard</span>
        </NavLink>
        <ul>
          <NavLink
            to="/unprocessed-loan-requests"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? " bg-blue-500 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 hover:text-blue-500"
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
                ? " bg-blue-500 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 hover:text-blue-500"
            }
          >
            Sektörler
            {missingSectorScores > 0 && (
              <span className="text-yellow-500 text-sm">
                ({missingSectorScores})
              </span>
            )}
          </NavLink>
          <NavLink
            to="/occupations"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? " bg-blue-500 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 hover:text-blue-500"
            }
          >
            Meslekler
            {missingOccupationScores > 0 && (
              <span className="text-yellow-500 text-sm">
                ({missingOccupationScores})
              </span>
            )}
          </NavLink>
          <NavLink
            to="/processed-loan-requests"
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? " bg-blue-500 text-white text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 hover:text-blue-500"
            }
          >
            İşlenmiş Müşteri Listesi
          </NavLink>
        </ul>

        {userType === "admin" && (
          <>
            <NavLink
              to="employees"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-blue-500 text-black text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                  : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 hover:text-blue-500"
              }
            >
              <span>Çalışanlar</span>
            </NavLink>
            <NavLink
              to="/prioritization"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? " bg-blue-500 text-black text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 "
                  : " text-lg flex items-center gap-x-4 p-2 hover:bg-ternanry/50 rounded-md mt-6 hover:text-blue-500"
              }
            >
              <span>Önceliklendirme</span>
            </NavLink>
          </>
        )}
      </ul>
      <div className="mt-12">
        {user && (
          <div>
            <p>{user && user.role_name.toUpperCase()}</p>
            <p className=" text-sm text-slate-500 ">{user && user.email}</p>
          </div>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className=" hover:bg-red-500 border-2 border-red-500 text-white w-full px-4 py-2 rounded-md font-bold text-sm mt-6"
          >
            Çıkış
          </button>
        )}
      </div>
    </div>
  );
};
export default SideBar;
