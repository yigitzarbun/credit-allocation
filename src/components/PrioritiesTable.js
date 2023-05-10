import React, { useState } from "react";
import { Link } from "react-router-dom";
import Prioritization from "./Prioritization";
import WeightsTable from "./WeightsTable";
function PrioritiesTable() {
  const [display, setDisplay] = useState("priorities");
  const handleDisplay = (value) => {
    if (value === "priorities") {
      setDisplay("priorities");
    } else if (value === "weights") {
      setDisplay("weights");
    }
  };
  return (
    <div className="mt-12">
      <div className="flex justify-between items-center">
        <h2 className="pageHeader">Önceliklendirme</h2>
        <Link to="/add-prioritization">
          <button className="actionGetButtonGreen">Yeni Ekle</button>
        </Link>
      </div>
      <div className="mt-4">
        <button
          onClick={() => handleDisplay("priorities")}
          className={
            display === "priorities"
              ? "border-2 font-bold border-blue-400 bg-blue-400 p-2 mr-2"
              : "border-2 font-bold border-blue-400 hover:text-blue-400 p-2 mr-2"
          }
        >
          İstisnai Önceliklendirme
        </button>
        <button
          onClick={() => handleDisplay("weights")}
          className={
            display === "weights"
              ? "border-2 font-bold border-blue-400 bg-blue-400 p-2"
              : "border-2 font-bold border-blue-400 hover:text-blue-400 p-2"
          }
        >
          Ağırlıklar
        </button>
      </div>
      {display === "priorities" ? <Prioritization /> : <WeightsTable />}
    </div>
  );
}

export default PrioritiesTable;
