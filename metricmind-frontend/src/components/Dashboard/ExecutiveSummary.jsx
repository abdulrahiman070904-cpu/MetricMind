import SummaryCard from "../SummaryCard";
import { FileText } from "lucide-react";

function ExecutiveSummary({ stats }) {
  return (
    <section
      style={{
        background: "#111827",
        border: "1px solid #1f2937",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: "0 10px 30px rgba(0,0,0,.25)",
        height: "100%",
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
            Executive Summary
          </h2>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "6px",
              fontSize: "14px",
            }}
          >
            Key business performance indicators
          </p>
        </div>

        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "12px",
            background: "rgba(168,85,247,.15)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FileText
            size={24}
            color="#a855f7"
          />
        </div>
      </div>

      <SummaryCard stats={stats} />
    </section>
  );
}

export default ExecutiveSummary;