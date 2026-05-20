"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Spinner } from "../Spinner/spinner";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { completedIssueCountAction } from "@/Store/actions/workspace.action";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TaskBarChart = ({ completedTaskId, workspaceId }: any) => {
  const dispatch = useAppDispatch();
  const {
    workspaceData: { dashboardCount },
  } = useAppSelector((store: any) => store);
  // const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!workspaceId || !completedTaskId) return;

    let isMounted = true;
    const init = async () => {
      const payload = {
        workspaceId,
        statusId: completedTaskId,
      };
      await dispatch(completedIssueCountAction(payload));
      if (isMounted) {
        setIsLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [completedTaskId, dispatch, workspaceId]);

  const cdata = {
    labels: dashboardCount?.map((d: any) => d?.day),
    datasets: [
      {
        label: "Tasks Completed",
        data: dashboardCount.map((d: any) => d?.count),
        backgroundColor: "#6366f1",
        borderRadius: 4,
        barThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1f2937",
        titleColor: "#94a3b8",
        bodyColor: "#ffffff",
        padding: 10,
        displayColors: false,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#94a3b8" },
      },
      y: {
        grid: { color: "rgba(255, 255, 255, 0.05)" },
        ticks: {
          color: "#94a3b8",
          stepSize: 1,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="h-[200px] w-full flex items-center justify-center text-sm text-gray-500 font-medium">
        <span className="flex items-center gap-1">
          <Spinner color="#6a7282" />
          Loading chart data...
        </span>
      </div>
    );
  }

  return (
    <div className="h-[200px] w-full">
      <Bar data={cdata} options={options} />
    </div>
  );
};

export default TaskBarChart;
