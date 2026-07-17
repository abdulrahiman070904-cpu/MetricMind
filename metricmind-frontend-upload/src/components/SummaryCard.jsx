function SummaryCard({ stats }) {
  const revenue = Number(stats.revenue);
  const cost = Number(stats.cost);
  const sales = Number(stats.sales);
  const quantity = Number(stats.quantity);

  const profit = revenue - cost;
  const profitMargin =
    revenue === 0 ? 0 : ((profit / revenue) * 100).toFixed(1);

  const averageOrderValue =
    sales === 0 ? 0 : (revenue / sales).toFixed(0);

  const summaryItems = [
    {
      label: "Total Revenue",
      value: `₹ ${revenue.toLocaleString()}`,
    },
    {
      label: "Total Profit",
      value: `₹ ${profit.toLocaleString()}`,
    },
    {
      label: "Profit Margin",
      value: `${profitMargin}%`,
    },
    {
      label: "Average Order Value",
      value: `₹ ${Number(averageOrderValue).toLocaleString()}`,
    },
    {
      label: "Total Orders",
      value: sales.toLocaleString(),
    },
    {
      label: "Total Quantity",
      value: quantity.toLocaleString(),
    },
  ];

  return (
    <div className="summary-box">
      {summaryItems.map((item) => (
        <div
          key={item.label}
          className="summary-item"
        >
          <span>{item.label}</span>

          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}

export default SummaryCard;