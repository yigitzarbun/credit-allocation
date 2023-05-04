import React, { useEffect } from "react";
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
  const handleDelete = (sector_id) => {
    dispatch(deleteSector(sector_id));
  };
  let userType = "";
  if (users && user) {
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
          <button className="actionSendButton">Sektör Ekle</button>
        </Link>
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
          {sectors.map((s) => (
            <tr key={s.sector_id} className="tableRow">
              <td>{s.sector_id}</td>
              <td>{s.sector_name}</td>
              <td>{s.sector_score}</td>
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
