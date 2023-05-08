import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomers,
  getOccupations,
  getSectors,
} from "../redux-stuff/actions";
import Metrics from "./Metrics";
import BarChart from "./BarChart";
import PieChart from "./PieChart";

function Dashboard() {
  const dispatch = useDispatch();
  const { customers } = useSelector((store) => store);
  const [sectorData, setSectorData] = useState({
    labels: [],
    datasets: [
      {
        label: "Customers by Sector",
        data: [],
      },
    ],
  });
  const [occupationData, setOccupationData] = useState({
    labels: [],
    datasets: [
      {
        label: "Customers by Occupation",
        data: [],
      },
    ],
  });
  const [productData, setProductData] = useState({
    labels: [],
    datasets: [
      {
        label: "Customers by Product Choice",
        data: [],
      },
    ],
  });
  const [genderData, setGenderData] = useState({
    labels: [],
    datasets: [
      {
        label: "Customers by Gender",
        data: [],
      },
    ],
  });
  const [sourceData, setSourceData] = useState({
    labels: [],
    datasets: [
      {
        label: "Customers by Sources",
        data: [],
      },
    ],
  });
  useEffect(() => {
    dispatch(getSectors());
    dispatch(getOccupations());
    dispatch(getCustomers());
  }, [dispatch]);

  useEffect(() => {
    if (customers && customers.length > 0) {
      const sectorCounts = {};
      customers.forEach((customer) => {
        const sectorName = customer.sector_name;
        if (sectorCounts[sectorName]) {
          sectorCounts[sectorName]++;
        } else {
          sectorCounts[sectorName] = 1;
        }
      });
      const sectorData = {
        labels: Object.keys(sectorCounts),
        datasets: [
          {
            label: "Customers by Sector",
            data: Object.values(sectorCounts),
            backgroundColor: ["#B9F3FC", "#00FFD1", "#0096FF"],
          },
        ],
      };
      setSectorData(sectorData);
    }
    if (customers && customers.length > 0) {
      const occupationCounts = {};
      customers.forEach((customer) => {
        const occupationName = customer.occupation_name;
        if (occupationCounts[occupationName]) {
          occupationCounts[occupationName]++;
        } else {
          occupationCounts[occupationName] = 1;
        }
      });
      const occupationData = {
        labels: Object.keys(occupationCounts),
        datasets: [
          {
            label: "Customers by Occupation",
            data: Object.values(occupationCounts),
            backgroundColor: ["#B9F3FC", "#00FFD1", "#0096FF"],
          },
        ],
      };
      setOccupationData(occupationData);
    }
    if (customers && customers.length > 0) {
      const productCount = {};
      customers.forEach((customer) => {
        const productName = customer.product_choice;
        if (productCount[productName]) {
          productCount[productName]++;
        } else {
          productCount[productName] = 1;
        }
      });
      const productData = {
        labels: Object.keys(productCount),
        datasets: [
          {
            label: "Customers by Product Choice",
            data: Object.values(productCount),
            backgroundColor: ["#B9F3FC", "#00FFD1", "#0096FF"],
          },
        ],
      };
      setProductData(productData);
    }
    if (customers && customers.length > 0) {
      const genderCount = {};
      customers.forEach((customer) => {
        const genderName = customer.gender;
        if (genderCount[genderName]) {
          genderCount[genderName]++;
        } else {
          genderCount[genderName] = 1;
        }
      });
      const genderData = {
        labels: Object.keys(genderCount),
        datasets: [
          {
            label: "Customers by Gender",
            data: Object.values(genderCount),
            backgroundColor: ["#B9F3FC", "#00FFD1", "#0096FF"],
          },
        ],
      };
      setGenderData(genderData);
    }
    if (customers && customers.length > 0) {
      const sourceCount = {};
      customers.forEach((customer) => {
        const sourceName = customer.source;
        if (sourceCount[sourceName]) {
          sourceCount[sourceName]++;
        } else {
          sourceCount[sourceName] = 1;
        }
      });
      const sourceData = {
        labels: Object.keys(sourceCount),
        datasets: [
          {
            label: "Customers by Source",
            data: Object.values(sourceCount),
            backgroundColor: ["#B9F3FC", "#00FFD1", "#0096FF"],
          },
        ],
      };
      setSourceData(sourceData);
    }
  }, [customers]);

  return (
    <div>
      <Metrics />
      <div className="flex justify-between mt-8">
        <div className="w-1/2">
          <BarChart data={sectorData} />
        </div>
        <div className="w-1/2">
          <BarChart data={occupationData} />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <div className="w-1/3">
          <PieChart data={productData} />
        </div>
        <div className="w-1/3">
          <PieChart data={genderData} />
        </div>
        <div className="w-1/3">
          <PieChart data={sourceData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
