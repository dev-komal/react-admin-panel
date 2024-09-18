import React from 'react'

import { Line } from 'react-chartjs-2'

const options = {
  responsive: true,
  backgroundColor: "rgba(75,192,192,1)",
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

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'First dataset',
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
    {
      label: 'Second dataset',
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: '#742774',
    },
  ],
}

export default function RevenuesChart() {
  return <Line options={options} data={data} />
}
