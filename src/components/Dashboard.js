import React from "react";
import Occupations from "./Occupations";
import SectorsTable from "./SectorsTable";
import LoanRequests from "./LoanRequests";
import Metrics from "../Metrics";
function Dashboard() {
  return (
    <div>
      <Metrics />
      <LoanRequests />
    </div>
  );
}

export default Dashboard;
