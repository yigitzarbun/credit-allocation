import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../redux-stuff/actions";
function EmployeesTable() {
  const users = useSelector((store) => store.users);
  const dispatch = useDispatch();
  const deleteEmployee = (user_id) => {
    dispatch(deleteUser(user_id));
  };
  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h2 className="pageHeader">Çalışanlar</h2>
        <Link to="/add-employee">
          <button className="actionSendButton">Çalışan Ekle</button>
        </Link>
      </div>
      <table className="table">
        <thead className="tableHead">
          <tr className="leading-loose">
            <th>Çalışan ID</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Aksiyon</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {users.map((u) => (
            <tr key={u.user_id} className="tableRow">
              <td>{u.user_id}</td>
              <td>{u.fname}</td>
              <td>{u.lname}</td>
              <td>{u.email}</td>
              <td>{u.role_name}</td>
              <td>
                <button
                  className="deleteButton"
                  onClick={() => deleteEmployee(u.user_id)}
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesTable;
