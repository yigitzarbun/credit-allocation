import React, { useEffect, useState } from "react";
import {
  getCustomers,
  postTypeformDataToDb,
  getPriorities,
} from "../redux-stuff/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
function UnprocessedLoanRequests() {
  const dispatch = useDispatch();
  const { customers, priorities } = useSelector((store) => store);
  const [formData, setFormData] = useState(null);
  const getTypeForm = () => {
    axios
      .get("http://localhost:9000/typeform")
      .then((res) => {
        setFormData(res.data.items[0]["answers"]);
        toast.success("Data obtained");
      })
      .catch((err) => console.log(err));
  };

  const sendTypeForm = () => {
    const dbData = {
      fname: formData[0]["text"],
      lname: formData[1]["text"],
      experience_years: formData[2]["number"],
      sector_id: Number(formData[3]["text"]),
      occupation_id: Number(formData[4]["text"]),
      priority_id: priorities.filter(
        (p) =>
          p.experience_years === formData[2]["number"] &&
          p.sector_id === Number(formData[3]["text"]) &&
          p.occupation_id === Number(formData[4]["text"])
      )[0]
        ? priorities.filter(
            (p) =>
              p.experience_years === formData[2]["number"] &&
              p.sector_id === Number(formData[3]["text"]) &&
              p.occupation_id === Number(formData[4]["text"])
          )[0]["priority_id"]
        : priorities.sort(function (a, b) {
            return b.priority - a.priority;
          })[0]["priority_id"],
    };
    if (dbData["fname"]) {
      dispatch(postTypeformDataToDb(dbData));
    }
  };

  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getPriorities());
  }, []);
  return (
    <div className="mt-12">
      <h2 className="subHeading">Müşteri Listesi</h2>
      <button className="bg-blue-300 p-2 mt-4" onClick={getTypeForm}>
        Veri Çek
      </button>
      <button className="bg-yellow-300 p-2 mt-4" onClick={sendTypeForm}>
        Veri Kaydet
      </button>
      <table className="w-full text-left mt-4">
        <thead className="bg-[#F6EACC]">
          <tr className="leading-loose">
            <th>Müşteri ID</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Tecrübe Yıl</th>
            <th>Sektör</th>
            <th>Meslek</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c.customer_id}
              className="border-b-2 border-b-slate-200 leading-loose"
            >
              <td>{c.customer_id}</td>
              <td>{c.fname}</td>
              <td>{c.lname}</td>
              <td>{c.experience_years}</td>
              <td>{c.sector_name}</td>
              <td>{c.occupation_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UnprocessedLoanRequests;
