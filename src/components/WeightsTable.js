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
  let weightScoreSum = null;
  if (weights) {
    for (let i = 0; i < weights.length; i++) {
      weightScoreSum += weights[i]["weight_score"];
    }
  }
  useEffect(() => {
    dispatch(getWeights());
    dispatch(getUsers());
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div>
      {weightScoreSum > 1 && (
        <div className="mt-4">
          <p className="text-red-400">
            <span className="font-bold"> UYARI:</span> Yüzde hesabını sağlamak
            için ağırlık toplamlarının 1'e eşit olduğundan emin olun.{" "}
          </p>
          <p className="text-red-400">
            Mevcut durumda ağırlık toplamları{" "}
            <span className="text-blue-400 font-bold">{weightScoreSum} </span>{" "}
            etmektedir.
          </p>
        </div>
      )}
      {weights && weights.length > 0 && (
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
      )}
    </div>
  );
}

export default WeightsTable;
