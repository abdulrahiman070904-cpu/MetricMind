import {
  TrendingUp,
  DollarSign,
  Package,
  Target,
} from "lucide-react";

function ForecastPanel({
  revenue,
  profit,
  quantity,
}) {
  const nextRevenue = revenue * 1.12;
  const nextProfit = profit * 1.08;
  const nextQuantity = quantity * 1.10;

  const formatCurrency = (value) =>
    `₹${Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;

  const forecasts = [
    {
      title: "Projected Revenue",
      value: formatCurrency(nextRevenue),
      icon: <DollarSign size={18} />,
      color: "#22c55e",
    },
    {
      title: "Projected Profit",
      value: formatCurrency(nextProfit),
      icon: <TrendingUp size={18} />,
      color: "#3b82f6",
    },
    {
      title: "Expected Quantity",
      value: Number(nextQuantity).toLocaleString("en-IN"),
      icon: <Package size={18} />,
      color: "#a855f7",
    },
    {
      title: "Growth Target",
      value: "12%",
      icon: <Target size={18} />,
      color: "#f59e0b",
    },
  ];

  return (
    <section
      style={{
        background: "#111827",
        border: "1px solid #1f2937",
        borderRadius: "16px",
        padding: "24px",
        height: "100%",
      }}
    >
      <h2
        style={{
          color: "#fff",
          marginBottom: "8px",
        }}
      >
        Forecast Panel
      </h2>

      <p
        style={{
          color: "#94a3b8",
          marginBottom: "24px",
          fontSize: "14px",
        }}
      >
        Estimated business performance for the next period
      </p>

      <div
        style={{
          display: "grid",
          gap: "16px",
        }}
      >
        {forecasts.map((item) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#1f2937",
              padding: "16px",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div
                style={{
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              <span
                style={{
                  color: "#cbd5e1",
                }}
              >
                {item.title}
              </span>
            </div>

            <strong
              style={{
                color: "#fff",
              }}
            >
              {item.value}
            </strong>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ForecastPanel;