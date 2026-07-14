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
    measures: ["FactSales.totalRevenue"],
    timeDimensions: [
      {
        dimension: "FactSales.saleDate",
        granularity: "day",
      },
    ],
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
          height: 350,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#d4af37",
        }}
      >
        Loading Revenue...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "#ff6b6b" }}>
        Error loading revenue chart.
      </div>
    );
  }

  const chartData = resultSet ? resultSet.chartPivot() : [];

  const labels = chartData.map((row) => {
    const date = new Date(row.x);

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  });

  const revenue = chartData.map((row) =>
    Number(row["FactSales.totalRevenue"])
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: revenue,
        borderColor: "#d4af37",
        backgroundColor: "rgba(212,175,55,0.15)",
        fill: true,
        borderWidth: 3,
        tension: 0.45,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: "#d4af37",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#151515",
        borderColor: "#d4af37",
        borderWidth: 1,
        titleColor: "#d4af37",
        bodyColor: "#ffffff",

        callbacks: {
          label: function (context) {
            return (
              "Revenue : ₹ " +
              Number(context.raw).toLocaleString()
            );
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        ticks: {
          color: "#bfbfbf",
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(212,175,55,0.08)",
        },

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
    <div
      style={{
        height: "350px",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
}

export default RevenueChart;