import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getSectors, deleteSector } from "../redux-stuff/actions";
function SectorsTable() {
  const dispatch = useDispatch();
  const sectors = useSelector((store) => store.sectors);
  const handleDelete = (sector_id) => {
    dispatch(deleteSector(sector_id));
  };
  useEffect(() => {
    dispatch(getSectors());
  }, []);
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
            <th>Sektör Skor</th>
            {userType == "admin" && <th>Sil</th>}
            {userType == "admin" && <th>Güncelle</th>}
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
              <td>{s.sector_score}</td>
              {userType == "admin" && (
                <td>
                  <button
                    onClick={() => handleDelete(s.sector_id)}
                    className="bg-red-300 text-white px-8 py-2"
                  >
                    Sil
                  </button>
                </td>
              )}
              {userType == "admin" && (
                <td>
                  <Link
                    to="/change-sector"
                    className="bg-blue-300 text-white px-8 py-2"
                    state={{
                      sector_id: s.sector_id,
                      sector_name: s.sector_name,
                      sector_score: s.sector_score,
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

export default SectorsTable;
