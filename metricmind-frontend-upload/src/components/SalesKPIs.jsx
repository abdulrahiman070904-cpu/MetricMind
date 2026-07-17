function SalesKPIs({ stats }) {
  const revenue = Number(stats.revenue);
  const cost = Number(stats.cost);
  const orders = Number(stats.sales);
  const quantity = Number(stats.quantity);

  const profit = revenue - cost;

  const margin =
    revenue === 0
      ? 0
      : ((profit / revenue) * 100).toFixed(1);

  const averageOrderValue =
    orders === 0
      ? 0
      : (revenue / orders).toFixed(0);

  const cards = [
    {
      title: "Revenue",
      value: `₹ ${revenue.toLocaleString()}`
    },
    {
      title: "Profit",
      value: `₹ ${profit.toLocaleString()}`
    },
    {
      title: "Orders",
      value: orders.toLocaleString()
    },
    {
      title: "Quantity",
      value: quantity.toLocaleString()
    },
    {
      title: "Profit Margin",
      value: `${margin}%`
    },
    {
      title: "Avg Order Value",
      value: `₹ ${Number(averageOrderValue).toLocaleString()}`
    }
  ];

  return (
    <div className="sales-kpi-grid">
      {cards.map((card) => (
        <div className="sales-kpi-card" key={card.title}>
          <p>{card.title}</p>

          <h2>{card.value}</h2>
        </div>
      ))}
    </div>
  );
}

export default SalesKPIs;

