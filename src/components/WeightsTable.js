import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getWeights, GET_USER } from "../redux-stuff/actions";
import { Link } from "react-router-dom";

function WeightsTable() {
  const dispatch = useDispatch();
  const { weights, users, user } = useSelector((store) => store);
  let userType = "";
  if (user && users && users.filter((u) => u.email === user.email)[0]) {
    userType = users.filter((u) => u.email === user.email)[0]["role_name"];
  }
  useEffect(() => {
    dispatch(getWeights());
    dispatch(getUsers());
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div>
      {weights && weights.length > 0 ? (
        <table className="table">
          <thead className="tableHead">
            <tr className="leading-loose">
              <th>Ağırlık ID</th>
              <th>Alan</th>
              <th>Ağırlık</th>
              {userType == "admin" && <th>Ağırlık Değiştir</th>}
            </tr>
          </thead>
          <tbody className="tableBody">
            {Array.isArray(weights) &&
              weights &&
              weights.map((w) => (
                <tr key={w.weight_id} className="tableRow">
                  <td>{w.weight_id}</td>
                  <td>
                    {w.field === "sector"
                      ? "Sektör"
                      : w.field === "occupation"
                      ? "Meslek"
                      : "Kıdem (Yıl)"}
                  </td>
                  <th>{w.weight_score}</th>
                  {userType == "admin" && (
                    <td>
                      <Link
                        to="/change-weight"
                        className="actionGetButton"
                        state={{
                          weight_id: w.weight_id,
                          field: w.field,
                          weight_score: w.weight_score,
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
        <div className="w-1/2 mx-auto text-center formContainer">
          <h2 className="font-bold text-slate-300 text-xl mt-4">
            İstisnai önceliklendirme bulunmuyor
          </h2>
          <p className="mt-4 text-sm">
            Yeni bir istisnai önceliklendirme ekleyerek, müşterilerin kredi
            skorlarından bağımsız olarak önceliklendirilmelerini
            sağlayabilirsin.
          </p>
          <Link to="/add-prioritization" className="w-1/2 mx-auto">
            <button className="positiveButton">
              Yeni Önceliklendirme Ekle
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default WeightsTable;
