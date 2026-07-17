import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useCubeQuery } from "@cubejs-client/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RevenueChart({ selectedRegion }) {
  const query = {
    measures: [
      "FactSales.totalRevenue",
      "FactSales.totalCost",
    ],
    timeDimensions: [
      {
        dimension: "FactSales.saleDate",
        granularity: "day",
      },
    ],
    order: {
      "FactSales.saleDate": "asc",
    },
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

  if (isLoading)
    return (
      <div
        style={{
          height: 350,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#d4af37",
        }}
      >
        Loading Sales Analytics...
      </div>
    );

  if (error)
    return (
      <div style={{ color: "#ff6b6b" }}>
        {error.toString()}
      </div>
    );

  const rows = resultSet ? resultSet.chartPivot() : [];

  const labels = rows.map((row) =>
    new Date(row.x).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    })
  );

  const revenue = rows.map((row) =>
    Number(row["FactSales.totalRevenue"] || 0)
  );

  const cost = rows.map((row) =>
    Number(row["FactSales.totalCost"] || 0)
  );

  const profit = revenue.map((r, i) => r - cost[i]);

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenue,
        borderColor: "#d4af37",
        backgroundColor: "rgba(212,175,55,0.15)",
        borderWidth: 3,
        tension: 0.4,
        fill: false,
      },
      {
        label: "Profit",
        data: profit,
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.15)",
        borderWidth: 3,
        tension: 0.4,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },

      tooltip: {
        callbacks: {
          label(context) {
            return (
              context.dataset.label +
              ": ₹ " +
              Number(context.raw).toLocaleString()
            );
          },
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#bfbfbf",
        },
      },

      y: {
        beginAtZero: true,

        ticks: {
          color: "#bfbfbf",

          callback(value) {
            return "₹" + Number(value).toLocaleString();
          },
        },
      },
    },
  };

  return (
    <div style={{ height: 380 }}>
      <Line data={data} options={options} />
    </div>
  );
}

export default RevenueChart;