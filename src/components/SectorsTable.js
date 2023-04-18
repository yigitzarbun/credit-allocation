import React from "react";
import { sectors } from "./data";
import { Link } from "react-router-dom";
function SectorsTable() {
  // kullanıcı admin ise aksiyon sütunu gözükecek
  const userType = "admin";
  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <h2 className="subHeading">Sektörler</h2>
        <Link to="/add-sector">
          <button className="bg-green-300 p-2">Sektör Ekle</button>
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
          {sectors.map((s) => (
            <tr
              key={s.sector_id}
              className="border-b-2 border-b-slate-200 leading-loose"
            >
              <td>{s.sector_id}</td>
              <td>{s.sector_name}</td>
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

export default SectorsTable;
