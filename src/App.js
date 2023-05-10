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
import PrioritiesTable from "./components/PrioritiesTable";
import ChangePrioritization from "./components/ChangePrioritization";
import AddEmployee from "./components/AddEmployee";
import PrivateRoutes from "./components/PrivateRoutes";
import AddPrioritization from "./components/AddPrioritization";
import ChangeSector from "./components/ChangeSector";
import ChangeOccupation from "./components/ChangeOccupation";
import ChangeCustomer from "./components/ChangeCustomer";
import Header from "./components/Header";
import ChangeWeight from "./components/ChangeWeight";
function App() {
  return (
    <div>
      <Header />
      <div className="flex justify-between p-4">
        <div className="w-1/5 mr-8">
          <SideBar />
        </div>
        <div className="w-4/5">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoutes />}>
              <Route exact path="/" element={<Dashboard />} />
              <Route path="/add-occupation" element={<AddOccupation />} />
              <Route path="/add-sector" element={<AddSector />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/sectors" element={<SectorsTable />} />
              <Route path="/occupations" element={<OccupationsTable />} />
              <Route path="/employees" element={<EmployeesTable />} />
              <Route path="/prioritization" element={<PrioritiesTable />} />
              <Route
                path="/add-prioritization"
                element={<AddPrioritization />}
              />
              <Route
                path="/change-prioritization"
                element={<ChangePrioritization />}
              />
              <Route path="/change-customer" element={<ChangeCustomer />} />
              <Route
                path="/unprocessed-loan-requests"
                element={<UnprocessedLoanRequests />}
              />
              <Route
                path="/processed-loan-requests"
                element={<ProcessedLoanRequests />}
              />
              <Route path="/change-sector" element={<ChangeSector />} />
              <Route path="/change-occupation" element={<ChangeOccupation />} />
              <Route path="/change-weight" element={<ChangeWeight />} />
            </Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
