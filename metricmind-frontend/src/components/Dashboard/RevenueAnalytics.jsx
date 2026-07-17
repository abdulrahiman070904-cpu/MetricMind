import RevenueChart from "../RevenueChart";
import { TrendingUp } from "lucide-react";

function RevenueAnalytics({
  selectedRegion,
  dateRange,
}) {
  return (
    <section
      style={{
        background: "#111827",
        border: "1px solid #1f2937",
        borderRadius: "16px",
        padding: "24px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.25)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              color: "#ffffff",
              fontSize: "22px",
              fontWeight: "700",
              margin: 0,
            }}
          >
            Revenue Analytics
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "6px",
              fontSize: "14px",
            }}
          >
            Revenue and profit performance over time
          </p>
        </div>

        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "12px",
            background: "rgba(212,175,55,0.15)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TrendingUp
            size={24}
            color="#d4af37"
          />
        </div>
      </div>

      <RevenueChart
        selectedRegion={selectedRegion}
        dateRange={dateRange}
      />
    </section>
  );
}

export default RevenueAnalytics;