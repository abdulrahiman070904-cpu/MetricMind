import RegionPieChart from "../RegionPieChart";
import { Globe2 } from "lucide-react";

function RegionAnalytics({
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
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
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
            Regional Performance
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "6px",
              fontSize: "14px",
            }}
          >
            Sales distribution across business regions
          </p>
        </div>

        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "12px",
            background: "rgba(59,130,246,.15)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Globe2
            size={24}
            color="#60a5fa"
          />
        </div>
      </div>

      <RegionPieChart
        selectedRegion={selectedRegion}
        dateRange={dateRange}
      />
    </section>
  );
}

export default RegionAnalytics;