import React from "react";
import Metrics from "./Metrics";
function Dashboard() {
  return (
    <div>
      <Metrics />
      <div className="flex mt-4">
        <button className="bg-blue-300 p-2 mr-2">Veri Çek</button>
        <button className="bg-yellow-300 p-2">PipeDrive</button>
      </div>
    </div>
  );
}

export default Dashboard;
