function ForecastCard({ stats }) {
  const revenue = Number(stats.revenue);
  const cost = Number(stats.cost);

  const profit = revenue - cost;
  const margin = revenue === 0 ? 0 : profit / revenue;

  // Simple forecast (demo)
  const projectedRevenue = Math.round(revenue * 1.08);
  const projectedProfit = Math.round(projectedRevenue * margin);

  return (
    <div className="insights-card">
      <h2 className="panel-title">Revenue Forecast</h2>

      <div className="insight-row">
        <span>Current Revenue</span>
        <strong>₹ {revenue.toLocaleString()}</strong>
      </div>

      <div className="insight-row">
        <span>Projected Revenue</span>
        <strong>₹ {projectedRevenue.toLocaleString()}</strong>
      </div>

      <div className="insight-row">
        <span>Projected Profit</span>
        <strong>₹ {projectedProfit.toLocaleString()}</strong>
      </div>

      <div className="insight-divider"></div>

      <div className="ai-summary">
        <h3>Forecast Insight</h3>

        <p>
          Based on the current business trend, revenue is projected to
          increase by approximately <strong>8%</strong> in the next period.
          If the current profit margin is maintained, projected profit is{" "}
          <strong>₹ {projectedProfit.toLocaleString()}</strong>.
        </p>
      </div>
    </div>
  );
}

export default ForecastCard;