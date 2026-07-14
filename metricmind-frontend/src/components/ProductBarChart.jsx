import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { useCubeQuery } from "@cubejs-client/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ProductBarChart({ selectedRegion }) {
  const query = {
    measures: ["FactSales.totalRevenue"],
    dimensions: ["Product.productName"],
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
          height: 320,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#d4af37",
        }}
      >
        Loading Product Performance...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "#ff6b6b" }}>
        Error loading product chart.
      </div>
    );
  }

  const rows = resultSet ? resultSet.tablePivot() : [];

  const labels = rows.map(
    (row) => row["Product.productName"]
  );

  const revenue = rows.map((row) =>
    Number(row["FactSales.totalRevenue"])
  );

  const data = {
    labels,

    datasets: [
      {
        label: "Revenue",

        data: revenue,

        backgroundColor: [
          "#D4AF37",
          "#C59D2C",
          "#B58D24",
          "#A57D1E",
          "#8E6B19",
          "#7A5C15",
        ],

        borderRadius: 10,

        borderSkipped: false,

        maxBarThickness: 55,
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
        backgroundColor: "#141414",

        borderColor: "#d4af37",

        borderWidth: 1,

        titleColor: "#d4af37",

        bodyColor: "#ffffff",

        callbacks: {
          label(context) {
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
          color: "#d4af37",
        },
      },

      y: {
        beginAtZero: true,

        grid: {
          color: "rgba(212,175,55,.08)",
        },

        ticks: {
          color: "#bdbdbd",

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
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

export default ProductBarChart;