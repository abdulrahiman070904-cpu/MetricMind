import { RefreshCw, Filter } from "lucide-react";

function DashboardFilters({
  regions,
  selectedRegion,
  setSelectedRegion,
  dateRange,
  setDateRange,
}) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <section
      style={{
        background: "#1e293b",
        border: "1px solid #334155",
        borderRadius: "14px",
        padding: "20px",
        marginTop: "24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Filter size={20} color="#60a5fa" />

        <span
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          Dashboard Filters
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <select
          value={selectedRegion}
          onChange={(e) =>
            setSelectedRegion(e.target.value)
          }
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #475569",
            background: "#0f172a",
            color: "white",
            minWidth: "180px",
          }}
        >
          <option value="">
            All Regions
          </option>

          {regions.map((region) => (
            <option
              key={region.name}
              value={region.name}
            >
              {region.name}
            </option>
          ))}
        </select>

        <select
          value={dateRange}
          onChange={(e) =>
            setDateRange(e.target.value)
          }
          style={{
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #475569",
            background: "#0f172a",
            color: "white",
            minWidth: "180px",
          }}
        >
          <option value="7">
            Last 7 Days
          </option>

          <option value="30">
            Last 30 Days
          </option>

          <option value="90">
            Last 90 Days
          </option>

          <option value="365">
            This Year
          </option>
        </select>

        <button
          onClick={handleRefresh}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          <RefreshCw size={18} />

          Refresh
        </button>
      </div>
    </section>
  );
}

export default DashboardFilters;