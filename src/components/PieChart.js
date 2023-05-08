import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
function PieChart(props) {
  const { data } = props;
  if (!data) {
    return <div>Loading...</div>;
  }
  return <Pie data={data} />;
}

export default PieChart;
