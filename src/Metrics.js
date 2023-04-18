import React from "react";

function Metrics() {
  return (
    <div>
      <h2 className="subHeading">Metrikler</h2>
      <div className="flex flex-wrap justify-between">
        <div className="w-1/4 p-8 text-white bg-[#D09600] border-r-white border-r-2 rounded-md">
          <p className="font-bold text-4xl">76.000</p>
          <p>Yeni Başvuru</p>
        </div>
        <div className="w-1/4 p-8 text-white bg-[#D09600] border-r-white border-r-2 rounded-md">
          <p className="font-bold text-4xl">44.000</p>
          <p>Açık Başvuru</p>
        </div>
        <div className="w-1/4 p-8 text-white bg-[#D09600] border-r-white border-r-2 rounded-md">
          <p className="font-bold text-4xl">%54</p>
          <p>Kredi Onay (%)</p>
        </div>
        <div className="w-1/4 p-8 text-white bg-[#D09600] rounded-md">
          <p className="font-bold text-4xl">44.000</p>
          <p>Açık Başvuru</p>
        </div>
      </div>
    </div>
  );
}

export default Metrics;
