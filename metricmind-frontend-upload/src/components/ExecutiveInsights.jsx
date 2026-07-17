function ExecutiveInsights({ stats }) {
  const revenue = Number(stats.revenue);
  const cost = Number(stats.cost);
  const sales = Number(stats.sales);
  const quantity = Number(stats.quantity);

  const profit = revenue - cost;

  const margin =
    revenue === 0
      ? 0
      : Number(((profit / revenue) * 100).toFixed(1));

  const averageRevenue =
    sales === 0
      ? 0
      : Math.round(revenue / sales);

  let health = "";
  let recommendation = "";

  if (margin >= 40) {
    health = "Excellent";
    recommendation =
      "The business is operating with an excellent profit margin. Continue investing in high-performing products while maintaining operational efficiency.";
  } else if (margin >= 25) {
    health = "Healthy";
    recommendation =
      "Revenue generation is strong and profitability is stable. Focus on expanding sales volume while keeping operational costs under control.";
  } else if (margin >= 15) {
    health = "Average";
    recommendation =
      "Revenue remains stable, but improving operational efficiency and reducing unnecessary costs could significantly improve profitability.";
  } else {
    health = "Needs Attention";
    recommendation =
      "Profit margin is low. Review pricing strategy, operational expenses, and underperforming products to improve business performance.";
  }

  const insights = [
    {
      label: "Total Profit",
      value: `₹ ${profit.toLocaleString()}`,
    },
    {
      label: "Profit Margin",
      value: `${margin}%`,
    },
    {
      label: "Average Revenue / Order",
      value: `₹ ${averageRevenue.toLocaleString()}`,
    },
    {
      label: "Total Quantity Sold",
      value: quantity.toLocaleString(),
    },
    {
      label: "Business Health",
      value: health,
    },
  ];

  return (
    <div className="insights-card">
      <h2 className="panel-title">
        Executive AI Insights
      </h2>

      {insights.map((item) => (
        <div
          key={item.label}
          className="insight-row"
        >
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}

      <div className="insight-divider"></div>

      <div className="ai-summary">
        <h3>AI Executive Summary</h3>

        <p>
          MetricMind analyzed the current business performance. Total revenue is{" "}
          <strong>₹ {revenue.toLocaleString()}</strong>, generating a profit of{" "}
          <strong>₹ {profit.toLocaleString()}</strong>. The organization is
          currently operating at a{" "}
          <strong>{margin}% profit margin</strong>, which indicates{" "}
          <strong>{health}</strong> business performance.
        </p>

        <br />

        <p>{recommendation}</p>
      </div>
    </div>
  );
}

export default ExecutiveInsights;