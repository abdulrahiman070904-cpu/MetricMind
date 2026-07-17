import { useCubeQuery } from "@cubejs-client/react";

function SalesGrowthCard({ selectedRegion }) {
  const query = {
    measures: ["FactSales.totalRevenue"],
    timeDimensions: [
      {
        dimension: "FactSales.saleDate",
        granularity: "month",
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

  if (isLoading) return <div className="card">Loading Growth...</div>;

  if (error) return <div>{error.toString()}</div>;

  const rows = resultSet ? resultSet.chartPivot() : [];

  let growth = 0;

  if (rows.length >= 2) {
    const previous = Number(rows[rows.length - 2]["FactSales.totalRevenue"]);
    const current = Number(rows[rows.length - 1]["FactSales.totalRevenue"]);

    if (previous > 0) {
      growth = ((current - previous) / previous) * 100;
    }
  }

  const positive = growth >= 0;

  return (
    <div className="dashboard-card">
      <h3>Monthly Growth</h3>

      <h1
        style={{
          color: positive ? "#22c55e" : "#ef4444",
          marginTop: 20,
        }}
      >
        {positive ? "+" : ""}
        {growth.toFixed(1)}%
      </h1>

      <p style={{ marginTop: 10 }}>
        Compared with previous month
      </p>
    </div>
  );
}

export default SalesGrowthCard;