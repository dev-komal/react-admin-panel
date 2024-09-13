import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  elements: {
    point: {
      usePointStyle: true,
      pointStyle: "circle",
    },
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        useBorderRadius: true,
        boxWidth: 4,
        boxHeight: 4,
        borderRadius: 2,
      },
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      border: { dash: [1, 4] },
      ticks: {
        min: 3.8,
        max: 7,
        stepSize: 50,
      },
      grid: {
        color: "#aaa",
        tickColor: "#000",
        tickBorderDash: [0, 1],
      },
    },
    x: {
      border: { dash: [1, 4] },
      ticks: {
        min: 3.8,
        max: 7,
        stepSize: 50,
      },
      grid: {
        color: "#aaa",
        tickColor: "#000",
        tickBorderDash: [0, 1],
      },
    },
  },
};

const labels = ["2019", "2020", "2021", "2022", "2023"];

const data = {
  labels: labels,
  datasets: [
    {
      label: "Costi",
      data: [25, 3, 80, 200, 40],
      fill: false,
      borderColor: "#2D9CDB",
      tension: 0.3,
    },
    {
      label: "Ricavi",
      data: [50, 125, 110, 70, 150],
      fill: false,
      borderColor: "#90BE6D",
      tension: 0.3,
    },
    {
      label: "Utile",
      data: [80, 15, 45, 70, 250],
      fill: false,
      borderColor: "#F9C74F",
      tension: 0.3,
    },
  ],
};

function LineChart() {
  return <Line options={options} data={data} />;
}

export default LineChart;
