import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getPriorities } from "../redux-stuff/actions";
import { useDispatch, useSelector } from "react-redux";
function Prioritization() {
  const { user, priorities } = useSelector((store) => store);
  const dispatch = useDispatch();
  let userType = "";
  if (user) {
    userType = user.role_name;
  }
  useEffect(() => {
    dispatch(getPriorities());
  }, []);
  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <h2 className="subHeading">Önceliklendirme</h2>
        <Link to="/add-prioritization">
          <button>Yeni Ekle</button>
        </Link>
      </div>
      <table className="w-full text-left mt-4">
        <thead className="bg-[#F6EACC]">
          <tr className="leading-loose">
            <th>Sektör</th>
            <th>Meslek</th>
            <th>Kıdem (Yıl)</th>
            <th>Öncelik Sıra</th>
            {userType == "admin" && <th>Öncelik Değiştir</th>}
          </tr>
        </thead>
        <tbody>
          {priorities.map((p) => (
            <tr
              key={p.priority_id}
              className="border-b-2 border-b-slate-200 leading-loose"
            >
              <td>{p.sector_name}</td>
              <td>{p.occupation_name}</td>
              <th>{p.experience_years}</th>
              <td>{p.priority}</td>
              {userType == "admin" && (
                <td>
                  <Link
                    to="/change-prioritization"
                    className="bg-blue-300 text-white px-8 py-2"
                    state={{
                      sector: p.sector_name,
                      occupation: p.occupation_name,
                      experience: p.experience_years,
                      priority: p.priority,
                      priority_id: p.priority_id,
                      sector_id: p.sector_id,
                      occupation_id: p.occupation_id,
                    }}
                  >
                    Değiştir
                  </Link>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Prioritization;
