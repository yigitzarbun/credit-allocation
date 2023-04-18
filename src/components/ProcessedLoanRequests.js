import React from "react";
import { loanRequests } from "./data";
function ProcessedLoanRequests() {
  return (
    <div className="mt-12">
      <h2 className="subHeading">İşlenmiş Müşteri Listesi</h2>
      <table className="w-full text-left mt-4">
        <thead className="bg-[#F6EACC]">
          <tr className="leading-loose">
            <th>Müşteri ID</th>
            <th>İsim</th>
            <th>Soyisim</th>
            <th>Doğum yılı</th>
            <th>Sektör</th>
            <th>Meslek</th>
            <th>Kredi Puan</th>
            <th>Kredi Uygunluk</th>
          </tr>
        </thead>
        <tbody>
          {loanRequests.map((l) => (
            <tr
              key={l.customer_id}
              className="border-b-2 border-b-slate-200 leading-loose"
            >
              <td>{l.customer_id}</td>
              <td>{l.fname}</td>
              <td>{l.lname}</td>
              <td>{l.year_birth}</td>
              <td>{l.sector}</td>
              <td>{l.occupation}</td>
              <td>{l.credit}</td>
              <td>{l.feasible}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProcessedLoanRequests;
