import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
function BarChart(props) {
  const { data } = props;
  if (!data) {
    return <div>Loading...</div>;
  }
  return <Bar data={data} />;
}

export default BarChart;
