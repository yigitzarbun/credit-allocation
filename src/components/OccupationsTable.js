import React, { useEffect } from "react";
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
  const handleDelete = (occupation_id) => {
    dispatch(deleteOccupation(occupation_id));
  };
  let userType = "";
  if (user && users) {
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
          <button className="actionSendButton">Meslek Ekle</button>
        </Link>
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
          {occupations.map((o) => (
            <tr key={o.occupation_id} className="tableRow">
              <td>{o.occupation_id}</td>
              <td>{o.occupation_name}</td>
              <td>{o.occupation_score}</td>
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
