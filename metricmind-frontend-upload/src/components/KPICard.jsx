import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
} from "lucide-react";

function KPICard({
  title,
  value,
  subtitle = "Current Period",
  trend = null,
  trendLabel = "",
}) {
  const getTrendIcon = () => {
    if (trend === null) {
      return <Minus size={16} />;
    }

    if (trend >= 0) {
      return <ArrowUpRight size={16} />;
    }

    return <ArrowDownRight size={16} />;
  };

  const getTrendColor = () => {
    if (trend === null) return "#9ca3af";

    return trend >= 0 ? "#22c55e" : "#ef4444";
  };

  return (
    <div className="kpi-card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <span className="kpi-title">
          {title}
        </span>

        <div
          style={{
            color: getTrendColor(),
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "13px",
            fontWeight: "600",
          }}
        >
          {getTrendIcon()}

          {trend !== null && (
            <span>
              {trend > 0 ? "+" : ""}
              {trend}%
            </span>
          )}
        </div>
      </div>

      <h2 className="kpi-value">
        {value}
      </h2>

      <p
        style={{
          marginTop: "12px",
          fontSize: "12px",
          color: "#9ca3af",
        }}
      >
        {trendLabel || subtitle}
      </p>
    </div>
  );
}

export default KPICard;