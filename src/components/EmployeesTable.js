import React from "react";
import { employees } from "./data";
import { Link } from "react-router-dom";
function EmployeesTable() {
  return (
    <div className="mt-12">
      <div className="flex justify-between">
        <h2 className="subHeading">Çalışanlar</h2>
        <Link to="/add-occupation">
          <button className="bg-green-300 p-2">Çalışan Ekle</button>
        </Link>
      </div>
      <table className="w-full text-left mt-4">
        <thead className="bg-[#F6EACC]">
          <tr className="leading-loose">
            <th>Çalışan ID</th>
            <th>Erişim</th>
            <th>Çalışan İsim</th>
            <th>Çalışan Soyisim</th>
            <th>Email</th>
            <th>Birim</th>
            <th>Pozisyon</th>
            <th>Aksiyon</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((e) => (
            <tr
              key={e.employee_id}
              className="border-b-2 border-b-slate-200 leading-loose"
            >
              <td>{e.employee_id}</td>
              <td>{e.access ? "Var" : "Yok"}</td>
              <td>{e.fname}</td>
              <td>{e.lname}</td>
              <td>{e.email}</td>
              <td>{e.department}</td>
              <td>{e.title}</td>
              <td>
                {e.access ? (
                  <button className="p-1 bg-red-300">Yetki kaldır</button>
                ) : (
                  <button className="p-1 bg-green-300">Yetki ver</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesTable;
