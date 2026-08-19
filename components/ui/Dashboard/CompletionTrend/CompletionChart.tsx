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
    labels: data.map((item) => item.day),
    datasets: [
      {
        data: data.map((item) => item.count),
        backgroundColor: "rgba(20, 184, 166, 0.75)",
        hoverBackgroundColor: "#14B8A6",
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 24,
      },
    ],
  };

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
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
        padding: 10,
        cornerRadius: 8,
        titleFont: {
          size: 12,
          weight: "500",
        },
        bodyFont: {
          size: 12,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#8B9298",
          font: {
            size: 11,
          },
          padding: 8,
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "#8B9298",
          stepSize: 1,
          font: {
            size: 11,
          },
          padding: 8,
        },
        grid: {
          color: "rgba(255,255,255,0.035)",
        },
        border: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-full w-full">
      <Bar data={chartData} options={options} />
    </div>
  );
}
