import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers, updateCustomer } from "../redux-stuff/actions";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";
function ProcessedLoanRequests() {
  const dispatch = useDispatch();
  const customers = useSelector((store) => store.customers);
  let filteredCustomers = [];
  if (
    customers &&
    customers != null &&
    customers != undefined &&
    customers.length > 0
  ) {
    filteredCustomers = customers.filter((c) => c.pipedrive == false);
  }
  const handlePipedrive = (data) => {
    const dataWidePipedrive = {
      name: `${data.fname}_${data.lname}`,
      email: data.email,
      "5976947d51a616982813da1436c6a6dd57a3b183": data.customer_id,
      "8f3d9b3f96d2cf5ad4b2f64a0bdc89b17a805150": data.experience_years,
      b1b1278b2f82a5823ce469c0937dcef024a18384: data.fname,
      "35d36111ce0c577a505402baf8064a3ce80c19ba": data.lname,
      "377a4938941350838ac7abb868c3b372ac9426a7": data.occupation_id,
      "865693ada6c3199a7dc795d975470d3006d979b6": data.priority_id,
      "646c04ebfa05ebc031c93ba032341904bb1b120c": data.sector_id,
    };
    const dataWideDb = {
      pipedrive: true,
      customer_id: data.customer_id,
      fname: data.fname,
      lname: data.lname,
      experience_years: data.experience_years,
      priority_id: data.priority_id,
      sector_id: data.sector_id,
      occupation_id: data.occupation_id,
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
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h2 className="pageHeader ">Müşteriler</h2>
        {filteredCustomers && filteredCustomers.length > 0 && (
          <button className="actionSendButton">Tümünü Gönder</button>
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
            {filteredCustomers.map((c) => (
              <tr key={c.customer_id} className="tableRow">
                <td>{c.customer_id}</td>
                <td>{c.full_name}</td>
                <td>{c.experience_years}</td>
                <td>{c.sector_name}</td>
                <td>{c.occupation_name}</td>
                <td>{c.credit_score}</td>
                <td>{c.priority}</td>
                <td>
                  {c.pipedrive === 0 ? (
                    <button
                      onClick={() => handlePipedrive(c)}
                      className="font-bold border-2 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white px-2 text-center"
                    >
                      Gönder
                    </button>
                  ) : (
                    "Gönderildi"
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
