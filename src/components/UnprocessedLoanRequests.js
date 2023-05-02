import React, { useEffect, useState } from "react";
import {
  getCustomers,
  postTypeformDataToDb,
  getPriorities,
  getSectors,
  getOccupations,
} from "../redux-stuff/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import axios from "axios";
function UnprocessedLoanRequests() {
  const dispatch = useDispatch();
  const { customers, priorities, sectors, occupations } = useSelector(
    (store) => store
  );
  const [formData, setFormData] = useState(null);
  let filteredCustomers = [];
  if (
    customers &&
    customers != null &&
    customers != undefined &&
    customers.length > 0
  ) {
    filteredCustomers = customers.filter((c) => c.pipedrive == false);
  }

  const getTypeForm = () => {
    axios
      .get("http://localhost:9000/typeform")
      .then((res) => {
        setFormData(res.data.items[0]["answers"]);
        toast.success("Data obtained");
      })
      .catch((err) => console.log(err));
  };

  const sectorWeight = 0.5;
  const occupationWeight = 0.4;
  const experienceWeight = 0.1;

  let creditScore = null;
  let priority = null;

  let customPriorities = "";
  if (priorities && priorities.length > 0 && Array.isArray(priorities)) {
    customPriorities = priorities.filter(
      (p) => p.experience_years && p.sector_id && p.occupation_id
    );
  }
  if (formData && sectors && occupations) {
    creditScore =
      sectorWeight *
        sectors.filter((s) => s.sector_id == Number(formData[3]["text"]))[0][
          "sector_score"
        ] +
      occupationWeight *
        occupations.filter(
          (o) => o.occupation_id == Number(formData[4]["text"])
        )[0]["occupation_score"] +
      experienceWeight * formData[2]["number"];

    for (let i = 0; i < customPriorities.length; i++) {
      if (
        customPriorities[i]["experience_years"] == formData[2]["number"] &&
        customPriorities[i]["sector_id"] == Number(formData[3]["text"]) &&
        customPriorities[i]["occupation_id"] == Number(formData[4]["text"])
      ) {
        priority = customPriorities[i]["priority"];
      } else if (creditScore >= 90) {
        priority = 1;
      } else if (creditScore >= 80) {
        priority = 2;
      } else if (creditScore >= 70) {
        priority = 3;
      } else if (creditScore >= 60) {
        priority = 4;
      } else {
        priority = 5;
      }
    }
  }
  const sendTypeForm = () => {
    const dbData = {
      fname: formData[0]["text"],
      lname: formData[1]["text"],
      experience_years: formData[2]["number"],
      sector_id: Number(formData[3]["text"]),
      occupation_id: Number(formData[4]["text"]),
      pipedrive: false,
      credit_score: creditScore,
      priority_id: priority,
    };
    if (dbData["fname"]) {
      dispatch(postTypeformDataToDb(dbData));
    }
    setFormData(null);
  };
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getPriorities());
    dispatch(getSectors());
    dispatch(getOccupations());
  }, []);
  return (
    <div className="mt-12">
      <h2 className="subHeading">Müşteri Listesi</h2>
      {!formData && (
        <button className="bg-blue-300 p-2 mt-4" onClick={getTypeForm}>
          Veri Çek
        </button>
      )}
      {formData && (
        <button className="bg-yellow-300 p-2 mt-4" onClick={sendTypeForm}>
          Veri Kaydet
        </button>
      )}
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
          {filteredCustomers.map((c) => (
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
