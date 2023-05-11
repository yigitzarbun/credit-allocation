import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOccupations,
  deleteOccupation,
  getUsers,
  GET_USER,
} from "../redux-stuff/actions";
function OccupationsTable() {
  const dispatch = useDispatch();
  const { occupations, users, user } = useSelector((store) => store);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  const handleDelete = (occupation_id) => {
    dispatch(deleteOccupation(occupation_id));
  };
  const handleFilter = () => {
    setFilter(!filter);
  };
  let userType = "";
  if (user && users && users.filter((u) => u.email === user.email)[0]) {
    userType = users.filter((u) => u.email === user.email)[0]["role_name"];
  }
  useEffect(() => {
    dispatch(getOccupations());
    dispatch(getUsers());
    dispatch({ type: GET_USER });
  }, []);

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h2 className="pageHeader">Meslekler</h2>
        <Link to="/add-occupation">
          <button className="actionGetButtonGreen">Meslek Ekle</button>
        </Link>
      </div>
      <div className="flex justify-between items-center mt-8 mb-4">
        <div className="w-1/2">
          <input
            type="text"
            className="p-2 w-1/2 border-2 text-black bg-slate-200 rounded-md mr-2 hover:border-blue-400 hover:bg-white"
            placeholder="Mesleklerde ara"
            onChange={handleSearch}
            value={search}
          />
          {search && (
            <button className="deleteButton py-2" onClick={handleClear}>
              Temizle
            </button>
          )}
        </div>
        {occupations.filter((o) => o.occupation_score === 0).length > 0 && (
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
            <th>Meslek ID</th>
            <th>Meslek Adı</th>
            <th>Meslek Skor</th>
            {userType == "admin" && <th>Sil</th>}
            {userType == "admin" && <th>Güncelle</th>}
          </tr>
        </thead>
        <tbody className="tableBody">
          {occupations
            .filter((o) => {
              if (search === "") {
                return o;
              } else if (
                o.occupation_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return o;
              }
            })
            .map((o) => (
              <tr key={o.occupation_id} className="tableRow">
                <td
                  className={o.occupation_score === 0 ? "text-yellow-400" : ""}
                >
                  {o.occupation_id}
                </td>
                <td
                  className={o.occupation_score === 0 ? "text-yellow-400" : ""}
                >
                  {o.occupation_name}
                </td>
                <td
                  className={o.occupation_score === 0 ? "text-yellow-400" : ""}
                >
                  {o.occupation_score}
                </td>
                {userType == "admin" && (
                  <td>
                    <button
                      onClick={() => handleDelete(o.occupation_id)}
                      className="deleteButton"
                    >
                      Sil
                    </button>
                  </td>
                )}
                {userType == "admin" && (
                  <td>
                    <Link
                      to="/change-occupation"
                      className="actionGetButton"
                      state={{
                        occupation_id: o.occupation_id,
                        occupation_name: o.occupation_name,
                        occupation_score: o.occupation_score,
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

export default OccupationsTable;
