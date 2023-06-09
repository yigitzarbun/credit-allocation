import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCustomers,
  getOccupations,
  getPriorities,
  getSectors,
  getWeights,
  updateCustomer,
} from "../redux-stuff/actions";
import { toast } from "react-toastify";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
function ProcessedLoanRequests() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const { customers, weights, sectors, occupations, priorities } = useSelector(
    (store) => store
  );
  let customPriorities = "";
  if (priorities && priorities.length > 0 && Array.isArray(priorities)) {
    customPriorities = priorities.filter(
      (p) => p.experience_years && p.sector_id && p.occupation_id
    );
  }
  let filteredCustomers = [];
  if (
    customers &&
    customers != null &&
    customers != undefined &&
    customers.length > 0
  ) {
    filteredCustomers = customers.filter((c) => c.pipedrive == false);
  }
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleClear = () => {
    setSearch("");
  };
  const handleFilter = () => {
    setFilter(!filter);
  };
  const handleRecalculate = () => {
    customers.forEach((c) => {
      // find customer sector
      let customerSector = sectors.find((s) => s.sector_id === c.sector_id);
      // find customer occupation
      let customerOccupation = occupations.find(
        (o) => o.occupation_id === c.occupation_id
      );
      // calculate credit score
      let creditScore = null;
      if (customerSector && customerOccupation) {
        let sectorScore = customerSector["sector_score"];
        if (sectorScore) {
          creditScore =
            weights.find((w) => w.field === "sector")["weight_score"] *
              sectorScore +
            weights.find((w) => w.field === "occupation")["weight_score"] *
              customerOccupation["occupation_score"] +
            weights.find((w) => w.field === "experience")["weight_score"] *
              c.experience_years;
        }
      }
      // calculate priority
      let existingPriority = c.priority_id;
      let priority = null;
      if (customPriorities.length > 0) {
        for (let i = 0; i < customPriorities.length; i++) {
          if (
            customPriorities[i]["experience_years"] == c.experience_years &&
            customPriorities[i]["sector_id"] == c.sector_id &&
            customPriorities[i]["occupation_id"] == c.occupation_id
          ) {
            priority = customPriorities[i]["priority_id"];
          } else if (creditScore >= 90) {
            priority = 2;
          } else if (creditScore >= 80) {
            priority = 3;
          } else if (creditScore >= 70) {
            priority = 4;
          } else if (creditScore >= 60) {
            priority = 5;
          } else {
            priority = 1;
          }
        }
      }
      const dataWide = {
        priority_id: priority,
        customer_id: c.customer_id,
        credit_score: creditScore,
      };
      dispatch(updateCustomer(dataWide, navigate));
    });
  };

  const handlePipedrive = (data) => {
    const dataWidePipedrive = {
      name: data.full_name,
      "17c609ff2110797a5a8cb5bebf23ebf7f2b4c907": data.age,
      "5976947d51a616982813da1436c6a6dd57a3b183": data.customer_id,
      "78f205ffdaa498bfb1898c4cc05b5546b773399f": data.email,
      "8f3d9b3f96d2cf5ad4b2f64a0bdc89b17a805150": data.experience_years,
      cf5bd57bfa793c13702d7b12951c8f67a0cfebd6: data.gender,
      "377a4938941350838ac7abb868c3b372ac9426a7": data.occupation_id,
      "5fa76ef2a70fb2214496897f922b3be104866baa": data.phone,
      cfd860d3ad9aecfb28c4f1354a72c443191626c5: data.priority,
      c242f4b6c1a6a61ab62b9546974deebb0058b00a: data.product_choice,
      "646c04ebfa05ebc031c93ba032341904bb1b120c": data.sector_id,
      cf7566fd6daf06c3075075c5bf48b035f81ed007: data.source,
    };
    const dataWideDb = {
      pipedrive: true,
      landing_id: data.landing_id,
      customer_id: data.customer_id,
      full_name: data.full_name,
      experience_years: data.experience_years,
      priority_id: data.priority_id,
      sector_id: data.sector_id,
      occupation_id: data.occupation_id,
      email: data.email,
      product_choice: data.product_choice,
      gender: data.gender,
      phone: data.phone,
      age: data.age,
      source: data.source,
      credit_score: data.credit_score,
    };
    axios
      .post(
        `https://api.pipedrive.com/v1/persons?api_token=2fd5ab47d7e8d546dab032dae385afd4bd097f4d`,
        dataWidePipedrive,
        {
          headers: {
            Authorization: `Bearer 2fd5ab47d7e8d546dab032dae385afd4bd097f4d`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Pipedrive'a gönderildi");
          dispatch(updateCustomer(dataWideDb));
        }
      })
      .catch((err) => console.log(err));
  };
  let missingInfoCustomers = [];
  let missingSectorCustomers = [];
  let missingOccupationCustomers = [];

  for (let i = 0; i < filteredCustomers.length; i++) {
    if (
      filteredCustomers[i]["experience_years"] == null ||
      filteredCustomers[i]["full_name"] == null ||
      filteredCustomers[i]["occupation_id"] == null ||
      filteredCustomers[i]["sector_id"] == null ||
      filteredCustomers[i]["email"] == null ||
      filteredCustomers[i]["product_choice"] == null ||
      filteredCustomers[i]["gender"] == null ||
      filteredCustomers[i]["phone"] == null ||
      filteredCustomers[i]["source"] == null
    ) {
      missingInfoCustomers.push(filteredCustomers[i]["customer_id"]);
    }
    if (filteredCustomers[i]["sector_score"] === 0) {
      missingSectorCustomers.push(filteredCustomers[i]["customer_id"]);
    }
    if (filteredCustomers[i]["occupation_score"] === 0) {
      missingOccupationCustomers.push(filteredCustomers[i]["customer_id"]);
    }
  }
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getWeights());
    dispatch(getSectors());
    dispatch(getOccupations());
    dispatch(getPriorities());
  }, []);
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h2 className="pageHeader ">Müşteriler</h2>
        {filteredCustomers &&
          filteredCustomers.length > 0 &&
          sectors &&
          occupations &&
          weights && (
            <button
              className="actionGetButtonGreen"
              onClick={handleRecalculate}
            >
              Yeniden Hesapla
            </button>
          )}
      </div>
      <div className="flex justify-between items-center mt-8 mb-4">
        <div className="w-1/2">
          <input
            type="text"
            className="p-2 w-1/2 border-2 text-black bg-slate-200 rounded-md mr-2 hover:border-blue-400 hover:bg-white"
            placeholder="Müşterilerde ara"
            onChange={handleSearch}
            value={search}
          />
          {search && (
            <button className="deleteButton py-2" onClick={handleClear}>
              Temizle
            </button>
          )}
        </div>
        {missingInfoCustomers.length > 0 && (
          <label className="hover:text-blue-400 cursor-pointer">
            <input
              type="checkbox"
              id="empty_scores"
              name="empty_scores"
              value={filter}
              onClick={handleFilter}
              className="mr-2"
            />
            Eksik kişisel veri
          </label>
        )}
      </div>
      {filteredCustomers && filteredCustomers.length > 0 ? (
        <table className="table">
          <thead className="tableHead">
            <tr className="leading-loose">
              <th>Müşteri ID</th>
              <th>İsim</th>
              <th>Tecrübe Yıl</th>
              <th>Sektör</th>
              <th>Meslek</th>
              <th>Kredi Skoru</th>
              <th>Öncelik</th>
              <th>Pipedrive</th>
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
              .filter((c) => {
                if (filter === false) {
                  return c;
                } else if (
                  filter === true &&
                  missingInfoCustomers.includes(c.customer_id)
                ) {
                  return c;
                }
              })
              .map((c) => (
                <tr key={c.customer_id} className="tableRow">
                  <td
                    className={
                      c.age === null ||
                      c.email === null ||
                      c.experience_years === null ||
                      c.full_name === null ||
                      c.gender === null ||
                      c.occupation_name === null ||
                      c.phone === null ||
                      c.priority === null ||
                      c.product_choice === null ||
                      c.sector_name === null ||
                      c.source === null
                        ? "text-yellow-400"
                        : "text-white"
                    }
                  >
                    {c.customer_id}
                  </td>
                  <td
                    className={
                      c.age === null ||
                      c.email === null ||
                      c.experience_years === null ||
                      c.full_name === null ||
                      c.gender === null ||
                      c.occupation_name === null ||
                      c.phone === null ||
                      c.priority === null ||
                      c.product_choice === null ||
                      c.sector_name === null ||
                      c.source === null
                        ? "text-yellow-400"
                        : "text-white"
                    }
                  >
                    {c.full_name}
                  </td>
                  <td
                    className={
                      c.age === null ||
                      c.email === null ||
                      c.experience_years === null ||
                      c.full_name === null ||
                      c.gender === null ||
                      c.occupation_name === null ||
                      c.phone === null ||
                      c.priority === null ||
                      c.product_choice === null ||
                      c.sector_name === null ||
                      c.source === null
                        ? "text-yellow-400"
                        : "text-white"
                    }
                  >
                    {c.experience_years}
                  </td>
                  <td
                    className={
                      c.age === null ||
                      c.email === null ||
                      c.experience_years === null ||
                      c.full_name === null ||
                      c.gender === null ||
                      c.occupation_name === null ||
                      c.phone === null ||
                      c.priority === null ||
                      c.product_choice === null ||
                      c.sector_name === null ||
                      c.source === null
                        ? "text-yellow-400"
                        : "text-white"
                    }
                  >
                    {c.sector_name}
                  </td>
                  <td
                    className={
                      c.age === null ||
                      c.email === null ||
                      c.experience_years === null ||
                      c.full_name === null ||
                      c.gender === null ||
                      c.occupation_name === null ||
                      c.phone === null ||
                      c.priority === null ||
                      c.product_choice === null ||
                      c.sector_name === null ||
                      c.source === null
                        ? "text-yellow-400"
                        : "text-white"
                    }
                  >
                    {c.occupation_name}
                  </td>
                  <td
                    className={
                      c.age === null ||
                      c.email === null ||
                      c.experience_years === null ||
                      c.full_name === null ||
                      c.gender === null ||
                      c.occupation_name === null ||
                      c.phone === null ||
                      c.priority === null ||
                      c.product_choice === null ||
                      c.sector_name === null ||
                      c.source === null
                        ? "text-yellow-400"
                        : "text-white"
                    }
                  >
                    {c.credit_score.toFixed(1)}
                  </td>
                  <td
                    className={
                      c.age === null ||
                      c.email === null ||
                      c.experience_years === null ||
                      c.full_name === null ||
                      c.gender === null ||
                      c.occupation_name === null ||
                      c.phone === null ||
                      c.priority === null ||
                      c.product_choice === null ||
                      c.sector_name === null ||
                      c.source === null
                        ? "text-yellow-400"
                        : "text-white"
                    }
                  >
                    {c.priority}
                  </td>
                  <td>
                    {c.pipedrive === 0 &&
                    c.sector_score !== 0 &&
                    c.occupation_score !== 0 &&
                    missingInfoCustomers.includes(c.customer_id) === false ? (
                      <button
                        onClick={() => handlePipedrive(c)}
                        className="font-bold border-2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white px-2 text-center"
                      >
                        Gönder
                      </button>
                    ) : c.sector_score === 0 ? (
                      <Link
                        to="/change-sector"
                        state={{
                          sector_id: c.sector_id,
                          sector_name: c.sector_name,
                          sector_score: c.sector_score,
                        }}
                      >
                        <button className="font-bold border-2 border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-black px-2 text-center">
                          Düzenle
                        </button>
                      </Link>
                    ) : c.occupation_score === 0 ? (
                      <Link
                        to="/change-occupation"
                        state={{
                          occupation_id: c.occupation_id,
                          occupation_name: c.occupation_name,
                          occupation_score: c.occupation_score,
                        }}
                      >
                        <button className="font-bold border-2 border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-black px-2 text-center">
                          Düzenle
                        </button>
                      </Link>
                    ) : (
                      missingInfoCustomers.includes(c.customer_id) && (
                        <Link to="/change-customer" state={{ customer: c }}>
                          <button className="font-bold border-2 border-yellow-500 rounded-md hover:bg-yellow-500 hover:text-black px-2 text-center">
                            Düzenle
                          </button>
                        </Link>
                      )
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="formContainer">
          <h2 className="pageHeader">Görüntülenecek veri yok</h2>
          <p className="mt-8">
            Yeni müşteri verilerini edinemk için Müşteri Listesi sayfasını
            ziyaret edin.
          </p>
          <Link to="/unprocessed-loan-requests">
            <button className="actionGetButton w-full">Müşteri Listesi</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProcessedLoanRequests;
