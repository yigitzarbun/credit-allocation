import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers, updateCustomer } from "../redux-stuff/actions";
import { toast } from "react-toastify";

import axios from "axios";
function ProcessedLoanRequests() {
  console.log(process.env.REACT_APP_PIPEDRIVE);
  const dispatch = useDispatch();
  const customers = useSelector((store) => store.customers);
  const handlePipedrive = (data) => {
    const dataWide = {
      ...data,
      pipedrive: true,
    };
    axios
      .post(
        `https://api.pipedrive.com/v1/persons?api_token=${process.env.REACT_APP_PIPEDRIVE}`,
        dataWide
      )
      .then((res) => {
        if (res.status === 201) {
          toast.success("Customers sent to Pipedrive");
          dispatch(updateCustomer(dataWide));
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dispatch(getCustomers());
  }, []);
  return (
    <div className="mt-12">
      <h2 className="subHeading">Müşteri Listesi</h2>
      <button className="bg-yellow-300 p-2 mt-8">PipeDrive</button>
      <table className="w-full text-left mt-4">
        <thead className="bg-[#F6EACC]">
          <tr className="leading-loose">
            <th>Seç</th>
            <th>Müşteri ID</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Tecrübe Yıl</th>
            <th>Sektör</th>
            <th>Meslek</th>
            <th>Öncelik</th>
            <th>Pipedrive</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr
              key={c.customer_id}
              className="border-b-2 border-b-slate-200 leading-loose"
            >
              <td>
                <input type="checkbox" />
              </td>
              <td>{c.customer_id}</td>
              <td>{c.fname}</td>
              <td>{c.lname}</td>
              <td>{c.experience_years}</td>
              <td>{c.sector_name}</td>
              <td>{c.occupation_name}</td>
              <td>{c.priority}</td>
              <td>
                {c.pipedrive === 0 ? (
                  <button onClick={() => handlePipedrive(c)}>Gönder</button>
                ) : (
                  "Gönderildi"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProcessedLoanRequests;
