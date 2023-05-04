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
import { Link, useNavigate } from "react-router-dom";

function UnprocessedLoanRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { customers, priorities, sectors, occupations } = useSelector(
    (store) => store
  );
  let filteredCustomers = [];
  if (
    customers &&
    customers != null &&
    customers != undefined &&
    customers.length > 0
  ) {
    filteredCustomers = customers.filter((c) => c.pipedrive == false);
  }

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

  const checkForExistingRecord = (landingId) => {
    const existingRecord = customers.find((c) => c.landing_id === landingId);
    if (existingRecord) {
      return true;
    }
    return false;
  };

  const getTypeForm = () => {
    axios
      .get("http://localhost:9000/typeform")
      .then((res) => {
        let form = null;
        for (let f = 0; f < res.data.items.length; f++) {
          let found = false;
          for (let c = 0; c < customers.length; c++) {
            if (
              res.data.items[f]["landing_id"] === customers[c]["landing_id"]
            ) {
              found = true;
              break;
            }
          }
          if (!found) {
            form = res.data.items[f];
          }
        }
        if (form && form["answers"] && sectors && occupations) {
          creditScore =
            sectorWeight *
              sectors.filter(
                (s) => s.sector_id == Number(form["answers"][3]["text"])
              )[0]["sector_score"] +
            occupationWeight *
              occupations.filter(
                (o) => o.occupation_id == Number(form["answers"][4]["text"])
              )[0]["occupation_score"] +
            experienceWeight * form["answers"][2]["number"];
        }
        if (customPriorities.length > 0) {
          for (let i = 0; i < customPriorities.length; i++) {
            if (
              customPriorities[i]["experience_years"] ==
                form["answers"][2]["number"] &&
              customPriorities[i]["sector_id"] ==
                Number(form["answers"][3]["text"]) &&
              customPriorities[i]["occupation_id"] ==
                Number(form["answers"][4]["text"])
            ) {
              priority = customPriorities[i]["priority"];
            }
          }
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
        if (form === null) {
          toast.error("Yeni kullanıcı kaydı bulunmamaktadır");
        } else {
          const dbData = {
            landing_id: form["landing_id"],
            fname: form["answers"][0]["text"],
            lname: form["answers"][1]["text"],
            experience_years: form["answers"][2]["number"],
            sector_id: Number(form["answers"][3]["text"]),
            occupation_id: Number(form["answers"][4]["text"]),
            pipedrive: false,
            credit_score: creditScore,
            priority_id: priority,
          };
          if (!checkForExistingRecord(dbData.landing_id)) {
            dispatch(postTypeformDataToDb(dbData));
          }
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getPriorities());
    dispatch(getSectors());
    dispatch(getOccupations());
  }, []);
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h2 className="pageHeader">Müşteri Listesi</h2>
        <button className="actionSendButton" onClick={getTypeForm}>
          Veri Çek
        </button>
      </div>
      <table className="table">
        <thead className="tableHead">
          <tr className="leading-loose">
            <th>Müşteri ID</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Tecrübe Yıl</th>
            <th>Sektör</th>
            <th>Meslek</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {filteredCustomers.map((c) => (
            <tr key={c.customer_id} className="tableRow">
              <td>{c.customer_id}</td>
              <td>{c.fname}</td>
              <td>{c.lname}</td>
              <td>{c.experience_years}</td>
              <td>{c.sector_name}</td>
              <td>{c.occupation_name}</td>
              <td>
                <Link
                  to="/change-customer"
                  className="actionGetButton"
                  state={{ customer: c }}
                >
                  Değiştir
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UnprocessedLoanRequests;
