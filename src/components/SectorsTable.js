import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getSectors,
  deleteSector,
  getUsers,
  GET_USER,
} from "../redux-stuff/actions";
function SectorsTable() {
  const dispatch = useDispatch();
  const { sectors, users, user } = useSelector((store) => store);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  const handleDelete = (sector_id) => {
    dispatch(deleteSector(sector_id));
  };
  const handleFilter = () => {
    setFilter(!filter);
  };
  let userType = "";
  if (users && user && users.filter((u) => u.email === user.email)[0]) {
    userType = users.filter((u) => u.email === user.email)[0]["role_name"];
  }
  useEffect(() => {
    dispatch(getSectors());
    dispatch(getUsers());
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h2 className="pageHeader">Sektörler</h2>
        <Link to="/add-sector">
          <button className="actionGetButtonGreen">Sektör Ekle</button>
        </Link>
      </div>
      <div className="flex justify-between items-center mt-8 mb-4">
        <div className="w-1/2">
          <input
            type="text"
            className="p-2 w-1/2 border-2 text-black bg-slate-200 rounded-md mr-2 hover:border-blue-400 hover:bg-white"
            placeholder="Sektörlerde ara"
            onChange={handleSearch}
            value={search}
          />
          {search && (
            <button className="deleteButton py-2" onClick={handleClear}>
              Temizle
            </button>
          )}
        </div>
        {sectors.filter((s) => s.sector_score === 0).length > 0 && (
          <label className="hover:text-blue-400 cursor-pointer">
            <input
              type="checkbox"
              id="empty_scores"
              name="empty_scores"
              value={filter}
              onClick={handleFilter}
              className="mr-2"
            />
            Değişiklik gerekenler
          </label>
        )}
      </div>
      <table className="table">
        <thead className="tableHead">
          <tr className="leading-loose">
            <th>Sektör ID</th>
            <th>Sektör Adı</th>
            <th>Sektör Skor</th>
            {userType == "admin" && <th>Sil</th>}
            {userType == "admin" && <th>Değiştir</th>}
          </tr>
        </thead>
        <tbody className="tableBody">
          {sectors
            .filter((s) => {
              if (search === "") {
                return s;
              } else if (
                s.sector_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return s;
              }
            })
            .filter((s) => {
              if (s.sector_score === 0 && filter === true) {
                return s;
              } else if (filter === false) {
                return s;
              }
            })
            .map((s) => (
              <tr key={s.sector_id} className="tableRow">
                <td className={s.sector_score === 0 && "text-yellow-400"}>
                  {s.sector_id}
                </td>
                <td className={s.sector_score === 0 && "text-yellow-400"}>
                  {s.sector_name}
                </td>
                <td className={s.sector_score === 0 && "text-yellow-400"}>
                  {s.sector_score}
                </td>
                {userType == "admin" && (
                  <td>
                    <button
                      onClick={() => handleDelete(s.sector_id)}
                      className="deleteButton"
                    >
                      Sil
                    </button>
                  </td>
                )}
                {userType == "admin" && (
                  <td>
                    <Link
                      to="/change-sector"
                      className="actionGetButton"
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
