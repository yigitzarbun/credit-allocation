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
      <div className="flex justify-between">
        <h2 className="subHeading">Çalışanlar</h2>
        <Link to="/add-employee">
          <button className="bg-green-300 p-2">Çalışan Ekle</button>
        </Link>
      </div>
      <table className="w-full text-left mt-4 text-black">
        <thead className="bg-[#F6EACC]">
          <tr className="leading-loose">
            <th>Çalışan ID</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Aksiyon</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr
              key={u.user_id}
              className="border-b-2 border-b-slate-200 leading-loose"
            >
              <td>{u.user_id}</td>
              <td>{u.fname}</td>
              <td>{u.lname}</td>
              <td>{u.email}</td>
              <td>{u.role_name}</td>
              <td>
                <button
                  className="bg-red-300 p-2"
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
