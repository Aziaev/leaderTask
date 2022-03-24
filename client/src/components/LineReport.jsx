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
import { format, parse, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { keys, reduce } from "lodash";
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
  const { products } = useAppContext();

  const data2 = useMemo(() => {
    const groupedData = reduce(
      products,
      (result, { date, profit, price }) => {
        const label = format(parseISO(date), "LL`yy", {
          locale: ru,
        });

        if (result[label]) {
          return (result[label] = {
            ...result,
            [label]: {
              profit: result[label].profit + parseFloat(profit.$numberDecimal),
              price: result[label].price + parseFloat(price.$numberDecimal),
            },
          });
        }

        return {
          ...result,
          [label]: {
            profit: parseFloat(profit.$numberDecimal),
            price: parseFloat(price.$numberDecimal),
          },
        };
      },
      {}
    );

    const graphLabels = keys(groupedData).sort((a, b) => {
      const dateA = parse(a, "LL`yy", new Date());
      const dateB = parse(b, "LL`yy", new Date());

      return dateA > dateB ? 1 : -1;
    });

    return {
      labels: graphLabels,
      datasets: [
        {
          label: "Прибыль",
          data: graphLabels.map((label) => groupedData[label].profit),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.4,
        },
        {
          label: "Выручка",
          data: graphLabels.map((label) => groupedData[label].price),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          fill: false,
          cubicInterpolationMode: "monotone",
          tension: 0.4,
        },
      ],
    };
  }, [products]);

  return <Line options={options} data={data2} />;
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
