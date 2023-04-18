import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddSector from "./components/AddSector";
import AddOccupation from "./components/AddOccupation";
import SideBar from "./components/sideBarMenu";
import SectorsTable from "./components/SectorsTable";
import OccupationsTable from "./components/OccupationsTable";
import UnprocessedLoanRequests from "./components/UnprocessedLoanRequests";
import ProcessedLoanRequests from "./components/ProcessedLoanRequests";
import EmployeesTable from "./components/EmployeesTable";
function App() {
  return (
    <div className="max-w-6xl mx-auto flex justify-between">
      <div className="w-1/5 mr-4">
        <SideBar />
      </div>
      <div className="w-4/5">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-occupation" element={<AddOccupation />} />
          <Route path="/add-sector" element={<AddSector />} />
          <Route path="/sectors" element={<SectorsTable />} />
          <Route path="/occupations" element={<OccupationsTable />} />
          <Route path="/employees" element={<EmployeesTable />} />
          <Route
            path="/unprocessed-loan-requests"
            element={<UnprocessedLoanRequests />}
          />
          <Route
            path="/processed-loan-requests"
            element={<ProcessedLoanRequests />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
