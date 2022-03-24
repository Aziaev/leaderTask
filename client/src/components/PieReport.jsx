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
import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { useAppContext } from "../AppContext";
import { LICENSE_TYPES } from "../constants";

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

export default function PieReport() {
  const { products } = useAppContext();

  const data = useMemo(() => {
    const licensesCount = LICENSE_TYPES.reduce((result, license) => {
      const filteredLicenses = products.filter(
        ({ product }) => product === license
      );

      return [...result, filteredLicenses.length];
    }, []);

    return {
      labels: LICENSE_TYPES,
      datasets: [
        {
          label: "Анализ популярности продуктов",
          data: licensesCount,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
  }, [products]);

  return <Pie data={data} />;
}
