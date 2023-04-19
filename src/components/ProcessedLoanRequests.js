import React, { useEffect } from "react";
import { processedLoanRequests } from "./data";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers } from "../redux-stuff/actions";
function ProcessedLoanRequests() {
  const dispatch = useDispatch();
  const customers = useSelector((store) => store.customers);
  useEffect(() => {
    dispatch(getCustomers());
  });
  return (
    <div className="mt-12">
      <h2 className="subHeading">Müşteri Listesi</h2>
      <table className="w-full text-left mt-4">
        <thead className="bg-[#F6EACC]">
          <tr className="leading-loose">
            <th>Müşteri ID</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Tecrübe Yıl</th>
            <th>Sektör</th>
            <th>Meslek</th>
            <th>Öncelik</th>
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
              <td>{c.priority}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProcessedLoanRequests;
