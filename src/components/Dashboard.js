import React, { useState } from "react";
import Occupations from "./Occupations";
import SectorsTable from "./SectorsTable";
import LoanRequests from "./LoanRequests";
import Metrics from "../Metrics";
function Dashboard() {
  const [display, setDisplay] = useState("loanRequests");
  const handleDisplay = (value) => {
    setDisplay(value);
  };
  return (
    <div>
      <Metrics />
      <div className="flex mt-4">
        <button className="bg-blue-300 p-2 mr-2">Veri Çek</button>
        <button className="bg-yellow-300 p-2">PipeDrive</button>
      </div>
      <nav>
        <button onClick={() => handleDisplay("loanRequests")}>
          Kredi Talepleri
        </button>
        <button onClick={() => handleDisplay("sectorsTable")}>Sektörler</button>
        <button onClick={() => handleDisplay("occupationsTable")}>
          Meslekler{" "}
        </button>
      </nav>
      {display == "loanRequests" && <LoanRequests />}
      {display == "sectorsTable" && <SectorsTable />}
      {display == "occupationsTable" && <Occupations />}
    </div>
  );
}

export default Dashboard;
