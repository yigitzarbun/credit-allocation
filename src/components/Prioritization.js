import React from "react";
import { matrice } from "./data";
import { Link } from "react-router-dom";
function Prioritization() {
  const userType = "admin";
  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <h2 className="subHeading">İstisnai Önceliklendirme</h2>
      </div>
      <table className="w-full text-left mt-4">
        <thead className="bg-[#F6EACC]">
          <tr className="leading-loose">
            <th>Sektör</th>
            <th>Meslek</th>
            <th>Grup</th>
            <th>Tercih Sıra</th>
            {userType == "admin" && <th>Aksiyon</th>}
          </tr>
        </thead>
        <tbody>
          {matrice.map((m) => (
            <tr key={m} className="border-b-2 border-b-slate-200 leading-loose">
              <td>{m[0]}</td>
              <td>{m[1]}</td>
              <td>A</td>
              <td>1</td>
              {userType == "admin" && (
                <td>
                  <Link
                    to="/change-prioritization"
                    className="bg-blue-300 text-white px-8 py-2"
                    state={{ sector: m[0], occupation: m[1] }}
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
