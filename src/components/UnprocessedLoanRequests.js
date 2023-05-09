import React, { useEffect, useState } from "react";
import {
  getCustomers,
  postTypeformDataToDb,
  getPriorities,
  getSectors,
  getOccupations,
  addSector,
  addOccupation,
} from "../redux-stuff/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function UnprocessedLoanRequests() {
  const dispatch = useDispatch();
  const { customers, priorities, sectors, occupations } = useSelector(
    (store) => store
  );
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
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
        // Check if there are any new customers at Typeform and obtain the first new customer's response data
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
        // Calculate the credit score AND add sector if it doesnt exist in DB
        let customerSector = null;
        let customerSectorExists = null;
        let customerOccupation = null;
        let customerOccupationExists = null;
        if (form) {
          customerSectorExists = sectors.find(
            (s) => s.sector_name === form["answers"][2]["choice"]["label"]
          );
          if (customerSectorExists == undefined) {
            dispatch(
              addSector({
                sector_name: form["answers"][2]["choice"]["label"],
                sector_score: 0,
              })
            );
            dispatch(getSectors());

            if (
              sectors.find(
                (s) => s.sector_name === form["answers"][2]["choice"]["label"]
              )
            ) {
              customerSector = sectors.find(
                (s) => s.sector_name === form["answers"][2]["choice"]["label"]
              )["sector_id"];
            } else {
              customerSector = customerSectorExists.sector_id;
            }
          }

          customerOccupationExists = occupations.find(
            (o) => o.occupation_name === form["answers"][3]["choice"]["label"]
          );
          if (customerOccupationExists == undefined) {
            dispatch(
              addOccupation({
                occupation_name: form["answers"][3]["choice"]["label"],
                occupation_score: 0,
              })
            );
            dispatch(getOccupations());
            if (
              occupations.find(
                (o) =>
                  o.occupation_name === form["answers"][2]["choice"]["label"]
              )
            ) {
              customerOccupation = occupations.find(
                (o) =>
                  o.occupation_name === form["answers"][2]["choice"]["label"]
              )["occupation_id"];
            } else {
              customerOccupation = customerOccupationExists.occupation_id;
            }
          }
        }
        if (form && form["answers"] && sectors && occupations) {
          // sector
          customerSector = sectors.find(
            (s) => s.sector_name === form["answers"][2]["choice"]["label"]
          )["sector_id"];
          // occupation
          customerOccupation = occupations.find(
            (o) => o.occupation_name === form["answers"][3]["choice"]["label"]
          )["occupation_id"];
          creditScore =
            sectorWeight *
              sectors.filter(
                (s) => s.sector_name == form["answers"][2]["choice"]["label"]
              )[0]["sector_score"] +
            occupationWeight *
              occupations.filter(
                (o) =>
                  o.occupation_name == form["answers"][3]["choice"]["label"]
              )[0]["occupation_score"] +
            experienceWeight * form["answers"][1]["number"];
        }
        // Calculate the priority. Check if the customer's responses match 'custom priorities scheme'
        if (customPriorities.length > 0) {
          for (let i = 0; i < customPriorities.length; i++) {
            if (
              customPriorities[i]["experience_years"] ==
                form["answers"][1]["number"] &&
              customPriorities[i]["sector_id"] == customerSector &&
              customPriorities[i]["occupation_id"] == customerOccupation
            ) {
              priority = customPriorities[i]["priority_id"];
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
        // Prepare customer data to be sent to the database
        if (form === null) {
          toast.error("Yeni kullanıcı kaydı bulunmamaktadır");
        } else {
          const dbData = {
            landing_id: form["landing_id"],
            full_name: form["answers"][0]["text"],
            experience_years: form["answers"][1]["number"],
            sector_id: customerSector,
            occupation_id: customerOccupation,
            email: form["answers"][4]["email"],
            product_choice: form["answers"][5]["choice"]["label"],
            gender: form["answers"][6]["choice"]["label"],
            source: form["answers"][7]["choice"]["label"],
            phone: form["answers"][8]["phone_number"],
            age: form["answers"][9]["number"],
            pipedrive: false,
            credit_score: creditScore,
            priority_id: priority,
          };
          // Post customer data to database
          if (
            !checkForExistingRecord(dbData.landing_id) &&
            dbData.sector_id &&
            dbData.occupation_id
          ) {
            dispatch(postTypeformDataToDb(dbData));
          }
        }
      })
      .catch((err) => console.log(err));
  };
  let missingInfoCustomers = [];
  let missingScoreCustomers = [];

  for (let i = 0; i < customers.length; i++) {
    if (
      customers[i]["experience_years"] == null ||
      customers[i]["full_name"] == null ||
      customers[i]["occupation_id"] == null ||
      customers[i]["sector_id"] == null ||
      customers[i]["email"] == null ||
      customers[i]["product_choice"] == null ||
      customers[i]["gender"] == null ||
      customers[i]["phone"] == null ||
      customers[i]["source"] == null
    ) {
      missingInfoCustomers.push(customers[i]["customer_id"]);
    }
    if (
      customers[i]["sector_score"] === 0 ||
      customers[i]["occupation_score"] === 0
    ) {
      missingScoreCustomers.push(customers[i]["customer_id"]);
    }
  }

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
        <button className="actionGetButtonGreen" onClick={getTypeForm}>
          Veri Çek
        </button>
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
            <th>Status</th>
            <th>Müşteri ID</th>
            <th>İsim</th>
            <th>Tecrübe Yıl</th>
            <th>Sektör</th>
            <th>Meslek</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {filteredCustomers
            .filter((c) => {
              if (search === "") {
                return c;
              } else if (
                c.full_name
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                c.sector_name
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase()) ||
                c.occupation_name
                  .toLocaleLowerCase()
                  .includes(search.toLocaleLowerCase())
              ) {
                return c;
              }
            })
            .map((c) => (
              <tr key={c.customer_id} className="tableRow">
                <td>
                  {missingInfoCustomers.includes(c.customer_id) &&
                  missingScoreCustomers.includes(c.customer_id) ? (
                    <p className="text-yellow-500">
                      Eksik Bilgi & Sektör/Meslek Skoru
                    </p>
                  ) : missingScoreCustomers.includes(c.customer_id) ? (
                    <p className="text-yellow-500">Sektör / Meslek Skoru</p>
                  ) : missingInfoCustomers.includes(c.customer_id) ? (
                    <p className="text-yellow-500">Eksik Bilgi</p>
                  ) : (
                    <p className="text-green-500">Hazır</p>
                  )}
                </td>
                <td>{c.customer_id}</td>
                <td>{c.full_name}</td>
                <td>{c.experience_years}</td>
                <td>
                  {c.sector_name ? (
                    c.sector_name
                  ) : (
                    <p className="text-yellow-400 font-bold">
                      Değişiklik Gerekli
                    </p>
                  )}
                </td>
                <td>
                  {c.occupation_name ? (
                    c.occupation_name
                  ) : (
                    <p className="text-yellow-400 font-bold">
                      Değişiklik Gerekli
                    </p>
                  )}
                </td>
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
