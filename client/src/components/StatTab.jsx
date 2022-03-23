import { Col, Row } from "antd";
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
import { Line, Pie } from "react-chartjs-2";
import { LICENSE_TYPES } from "../constants";
import mockData from "../mockData.json";

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

export const options = {
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

const groupedData = reduce(
  mockData,
  (result, { date, profit, price }) => {
    const label = format(parseISO(date), "LL`yy", {
      locale: ru,
    });

    if (result[label]) {
      return (result[label] = {
        ...result,
        [label]: {
          profit: result[label].profit + profit,
          price: result[label].price + price,
        },
      });
    }

    return {
      ...result,
      [label]: {
        profit: profit,
        price: price,
      },
    };
  },
  {}
);

const graphLabels = keys(groupedData).sort((a, b) => {
  const dateA = parse(a, "LL`yy", new Date());
  const dateB = parse(b, "LL`yy", new Date());

  console.log({ a, b, dateA, dateB });

  return dateA > dateB ? 1 : -1;
});

const data2 = {
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

export default function StatTab() {
  const data = useMemo(() => {
    const licensesCount = LICENSE_TYPES.reduce((result, license) => {
      const filteredLicenses = mockData.filter(
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
  }, []);

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Анализ популярности продуктов</h1>
      </div>
      <Row>
        <Col span={16} offset={4}>
          <Pie data={data} />
        </Col>
      </Row>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h1>Анализ выручки и прибыли</h1>
      </div>
      <Row>
        <Col span={24}>
          <Line options={options} data={data2} />
        </Col>
      </Row>
    </>
  );
}
