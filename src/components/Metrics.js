import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  getOccupations,
  getSectors,
} from "../redux-stuff/actions";

function Metrics() {
  const dispatch = useDispatch();
  const { customers, sectors, occupations } = useSelector((store) => store);
  useEffect(() => {
    dispatch(getCustomers());
    dispatch(getSectors());
    dispatch(getOccupations());
  }, []);
  return (
    <div className="mt-8">
      <h2 className="pageHeader">Metrikler</h2>
      <div className="flex flex-wrap justify-between mt-4">
        <div className="w-1/4 p-8 text-white bg-cyan-400 border-r-black border-r-2 rounded-md hover:bg-gradient-to-r from-cyan-500 to-blue-500">
          <p className="font-bold text-4xl">{customers && customers.length}</p>
          <p>Toplam Başvuru</p>
        </div>
        <div className="w-1/4 p-8 text-white bg-blue-400 border-r-black border-r-2 rounded-md hover:bg-gradient-to-r from-sky-500 to-indigo-500">
          <p className="font-bold text-4xl">
            {" "}
            {customers && customers.filter((c) => c.pipedrive === 0).length}
          </p>
          <p>Açık Başvuru</p>
        </div>
        <div className="w-1/4 p-8 text-white bg-teal-400 border-r-black border-r-2 rounded-md hover:bg-gradient-to-r from-violet-500 to-fuchsia-500">
          <p className="font-bold text-4xl">
            {customers &&
              customers.filter(
                (c) =>
                  c.age === null ||
                  c.email === null ||
                  c.experience_years === null ||
                  c.full_name === null ||
                  c.gender === null ||
                  c.occupation_name === null ||
                  c.phone === null ||
                  c.product_choice === null ||
                  c.sector_name === null ||
                  c.source === null
              ).length}
          </p>
          <p>İşlem Gereken Müşteri</p>
        </div>
        <div className="w-1/4 p-8 text-white bg-blue-600 rounded-md hover:bg-gradient-to-r from-purple-500 to-pink-500">
          <p className="font-bold text-4xl">
            {sectors &&
              occupations &&
              sectors.filter((s) => s.sector_score === 0).length +
                occupations.filter((o) => o.occupation_score === 0).length}
          </p>
          <p>İşlem Gereken Sektör / Meslek</p>
        </div>
      </div>
    </div>
  );
}

export default Metrics;
