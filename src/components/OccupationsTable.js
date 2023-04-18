import React from "react";
import { occupations } from "./data";
import { Link } from "react-router-dom";
function OccupationsTable() {
  const userType = "admin";
  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <h2 className="subHeading">Meslekler</h2>
        <Link to="/add-occupation">
          <button className="bg-green-300 p-2">Meslek Ekle</button>
        </Link>
      </div>
      <table className="w-full text-left mt-4">
        <thead className="bg-[#F6EACC]">
          <tr className="leading-loose">
            <th>Sektör ID</th>
            <th>Sektör Adı</th>
            {userType == "admin" && <th>Aksiyon</th>}
          </tr>
        </thead>
        <tbody>
          {occupations.map((o) => (
            <tr
              key={o.occupation_id}
              className="border-b-2 border-b-slate-200 leading-loose"
            >
              <td>{o.occupation_id}</td>
              <td>{o.occupation_name}</td>
              {userType == "admin" && (
                <td>
                  <button className="bg-red-300 text-white px-8 py-2">
                    Sil
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OccupationsTable;
