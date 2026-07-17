import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

function AllInsights({
  stats,
  profit,
  margin,
}) {
  const revenue = Number(stats?.revenue || 0);
  const orders = Number(stats?.sales || 0);
  const quantity = Number(stats?.quantity || 0);

  const insights = [
    {
      icon:
        margin >= 20 ? (
          <CheckCircle color="#22c55e" size={18} />
        ) : (
          <AlertTriangle color="#f59e0b" size={18} />
        ),
      title: "Profit Margin",
      description:
        margin >= 20
          ? "Profit margin is healthy."
          : "Profit margin can be improved.",
    },
    {
      icon: <TrendingUp color="#3b82f6" size={18} />,
      title: "Revenue",
      description: `Current revenue is ₹${revenue.toLocaleString(
        "en-IN"
      )}.`,
    },
    {
      icon:
        profit >= 0 ? (
          <TrendingUp color="#22c55e" size={18} />
        ) : (
          <TrendingDown color="#ef4444" size={18} />
        ),
      title: "Profit",
      description: `Net profit is ₹${profit.toLocaleString(
        "en-IN"
      )}.`,
    },
    {
      icon: <Brain color="#a855f7" size={18} />,
      title: "AI Suggestion",
      description:
        quantity > orders
          ? "Increase inventory for high-performing products."
          : "Focus on improving sales conversion.",
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <Brain
          color="#8b5cf6"
          size={24}
        />

        <h2
          style={{
            color: "#ffffff",
            margin: 0,
            fontSize: "22px",
          }}
        >
          AI Business Insights
        </h2>
      </div>

      <div
        style={{
          display: "grid",
          gap: "16px",
        }}
      >
        {insights.map((item) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              gap: "14px",
              alignItems: "flex-start",
              background: "#1f2937",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div>{item.icon}</div>

            <div>
              <h4
                style={{
                  color: "#ffffff",
                  margin: 0,
                  marginBottom: "6px",
                }}
              >
                {item.title}
              </h4>

              <p
                style={{
                  color: "#cbd5e1",
                  margin: 0,
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AllInsights;