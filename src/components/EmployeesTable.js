import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers, GET_USER } from "../redux-stuff/actions";
function EmployeesTable() {
  const { users, user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const deleteEmployee = (user_id) => {
    dispatch(deleteUser(user_id));
  };
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  let userType = "";
  if (users && user) {
    userType = users.filter((u) => u.email === user.email)[0]["role_name"];
  }
  useEffect(() => {
    dispatch(getUsers());
    dispatch({ type: GET_USER });
  }, []);
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h2 className="pageHeader">Çalışanlar</h2>
        {userType === "admin" && (
          <Link to="/add-employee">
            <button className="actionGetButtonGreen">Çalışan Ekle</button>
          </Link>
        )}
      </div>
      <input
        type="text"
        className="p-2 my-4 w-1/3 border-2 text-black bg-slate-200 rounded-md mr-2 hover:border-blue-400 hover:bg-white"
        placeholder="Müşterilerde ara"
        onChange={handleSearch}
        value={search}
      />
      {search && (
        <button className="deleteButton py-2" onClick={handleClear}>
          Temizle
        </button>
      )}
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
          {users
            .filter((e) => {
              if (search === "") {
                return e;
              } else if (
                e.fname.toLowerCase().includes(search.toLowerCase()) ||
                e.lname.toLowerCase().includes(search.toLowerCase()) ||
                e.email.toLowerCase().includes(search.toLowerCase()) ||
                e.role_name.toLowerCase().includes(search.toLowerCase())
              ) {
                return e;
              }
            })
            .map((u) => (
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
