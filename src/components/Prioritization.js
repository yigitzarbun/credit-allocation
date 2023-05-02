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
  let filteredPriorities = [];
  if (priorities === null) {
    filteredPriorities = "Loading";
  } else if (priorities.length === 0) {
    filteredPriorities = "İstisnai önceliklendirme yok";
  } else if (Array.isArray(priorities) && priorities) {
    filteredPriorities = priorities.filter(
      (p) => p.sector_id && p.occupation_id && p.experience_years
    );
  }
  useEffect(() => {
    dispatch(getPriorities());
  }, []);
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h2 className="pageHeader">Önceliklendirme</h2>
        <Link to="/add-prioritization">
          <button className="actionSendButton">Yeni Ekle</button>
        </Link>
      </div>
      {filteredPriorities && filteredPriorities.length > 0 ? (
        <table className="table">
          <thead className="tableHead">
            <tr className="leading-loose">
              <th>Sektör</th>
              <th>Meslek</th>
              <th>Kıdem (Yıl)</th>
              <th>Öncelik Sıra</th>
              {userType == "admin" && <th>Öncelik Değiştir</th>}
            </tr>
          </thead>
          <tbody className="tableBody">
            {Array.isArray(filteredPriorities) &&
              filteredPriorities &&
              filteredPriorities.map((p) => (
                <tr key={p.priority_id} className="tableRow">
                  <td>{p.sector_name}</td>
                  <td>{p.occupation_name}</td>
                  <th>{p.experience_years}</th>
                  <td>{p.priority}</td>
                  {userType == "admin" && (
                    <td>
                      <Link
                        to="/change-prioritization"
                        className="actionGetButton"
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
      ) : (
        <>
          <h2>İstisnai önceliklendirme bulunmuyor.</h2>{" "}
          <Link to="/add-prioritization">
            <button className="bg-green-300 p-2">Yeni Ekle</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Prioritization;
