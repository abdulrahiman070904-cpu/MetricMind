import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { useCubeQuery } from "@cubejs-client/react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function RegionPieChart({ selectedRegion }) {
  const query = {
    measures: ["FactSales.count"],
    dimensions: ["Region.regionName"],
  };

  if (selectedRegion !== "") {
    query.filters = [
      {
        member: "Region.regionName",
        operator: "equals",
        values: [selectedRegion],
      },
    ];
  }

  const { resultSet, isLoading, error } = useCubeQuery(query);

  if (isLoading) {
    return (
      <div
        style={{
          height: 280,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#d4af37",
        }}
      >
        Loading Region Analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "#ff6b6b" }}>
        Error loading region analytics.
      </div>
    );
  }

  const rows = resultSet ? resultSet.tablePivot() : [];

  const labels = rows.map((row) => row["Region.regionName"]);

  const values = rows.map((row) =>
    Number(row["FactSales.count"])
  );

  const data = {
    labels,

    datasets: [
      {
        data: values,

        backgroundColor: [
          "#D4AF37",
          "#B08D2E",
          "#8C6A1F",
          "#6C5832",
          "#E6C766",
          "#9F7B1D",
        ],

        borderColor: "#141414",

        borderWidth: 2,

        hoverOffset: 12,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "68%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          color: "#d6d6d6",

          padding: 20,

          usePointStyle: true,

          pointStyle: "circle",
        },
      },

      tooltip: {
        backgroundColor: "#141414",

        borderColor: "#d4af37",

        borderWidth: 1,

        titleColor: "#d4af37",

        bodyColor: "#ffffff",
      },
    },
  };

  return (
    <div
      style={{
        height: "300px",
      }}
    >
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
}

export default RegionPieChart;