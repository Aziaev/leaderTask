import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { map } from "lodash";
import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import { useAppContext } from "../AppContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Tooltip,
  Legend
);

export default function LineReport() {
  const { revenueReport } = useAppContext();

  const data = useMemo(() => {
    const labels = map(revenueReport, ({ label }) => label);

    return {
      labels,
      datasets: [
        {
          label: "Прибыль",
          data: revenueReport.map(
            ({ profit: { $numberDecimal } }) => $numberDecimal
          ),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.4,
        },
        {
          label: "Выручка",
          data: revenueReport.map(
            ({ price: { $numberDecimal } }) => $numberDecimal
          ),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.4,
        },
      ],
    };
  }, [revenueReport]);

  return <Line options={options} data={data} />;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Value",
        },
        suggestedMin: -10,
        suggestedMax: 200,
      },
    },
  },
};
