"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function CompletionChart({ data }: { data: any[] }) {
  const chartData = {
    labels: data.map((d) => d.day),

    datasets: [
      {
        data: data.map((d) => d.count),

        backgroundColor: "#14B8A6",

        borderRadius: 8,

        borderSkipped: false,

        barThickness: 22,
      },
    ],
  };

  const options: any = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        displayColors: false,

        backgroundColor: "#1B1F22",

        borderColor: "#2D3439",

        borderWidth: 1,

        titleColor: "#F3F4F6",

        bodyColor: "#F3F4F6",

        padding: 12,

        cornerRadius: 10,
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#9CA3AF",

          font: {
            size: 12,
          },
        },

        border: {
          display: false,
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#9CA3AF",

          stepSize: 1,

          font: {
            size: 12,
          },
        },

        grid: {
          color: "rgba(255,255,255,.04)",

          drawBorder: false,
        },

        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}
