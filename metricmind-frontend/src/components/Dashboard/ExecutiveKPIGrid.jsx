import KPICard from "../KPICard";

function ExecutiveKPIGrid({
  revenue,
  profit,
  orders,
  quantity,
  margin,
  averageOrder,
}) {
  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;

  const formatNumber = (value) =>
    Number(value).toLocaleString("en-IN");

  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "20px",
        marginTop: "24px",
        marginBottom: "30px",
      }}
    >
      <KPICard
        title="TOTAL REVENUE"
        value={formatCurrency(revenue)}
        subtitle="Overall Revenue"
        trend={12.4}
        trendLabel="vs previous period"
      />

      <KPICard
        title="TOTAL PROFIT"
        value={formatCurrency(profit)}
        subtitle="Net Profit"
        trend={8.2}
        trendLabel="Profit Growth"
      />

      <KPICard
        title="TOTAL ORDERS"
        value={formatNumber(orders)}
        subtitle="Completed Orders"
        trend={6.8}
        trendLabel="Order Growth"
      />

      <KPICard
        title="TOTAL QUANTITY"
        value={formatNumber(quantity)}
        subtitle="Units Sold"
        trend={4.3}
        trendLabel="Sales Volume"
      />

      <KPICard
        title="PROFIT MARGIN"
        value={`${margin}%`}
        subtitle="Current Margin"
        trend={Number(margin) >= 20 ? 2.5 : -1.8}
        trendLabel="Margin Performance"
      />

      <KPICard
        title="AVG ORDER VALUE"
        value={formatCurrency(averageOrder)}
        subtitle="Per Order"
        trend={5.4}
        trendLabel="Average Order Value"
      />
    </section>
  );
}

export default ExecutiveKPIGrid;