import { useEffect, useState, useCallback } from "react";
import cubejsApi from "../cube";

import Header from "../components/Header";

import ExecutiveKPIGrid from "../components/Dashboard/ExecutiveKPIGrid";
import DashboardFilters from "../components/Dashboard/DashboardFilters";
import ExecutiveSummary from "../components/Dashboard/ExecutiveSummary";
import RevenueAnalytics from "../components/Dashboard/RevenueAnalytics";
import RegionAnalytics from "../components/Dashboard/RegionAnalytics";
import ProductAnalytics from "../components/Dashboard/ProductAnalytics";
import ForecastPanel from "../components/Dashboard/ForecastPanel";
import AllInsights from "../components/Dashboard/AllInsights";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [regions, setRegions] = useState([]);

  const [selectedRegion, setSelectedRegion] = useState("");

  const [dateRange, setDateRange] = useState("365");

  const getDateRange = () => {
    switch (dateRange) {
      case "7":
        return "Last 7 days";

      case "30":
        return "Last 30 days";

      case "90":
        return "Last 90 days";

      case "365":
        return "This year";

      default:
        return null;
    }
  };

  const loadRegions = useCallback(async () => {
    try {
      const result = await cubejsApi.load({
        dimensions: ["Region.regionName"],
        order: {
          "Region.regionName": "asc",
        },
      });

      const data = result.tablePivot().map((r) => ({
        name: r["Region.regionName"],
      }));

      setRegions(data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);

      setError("");

      const query = {
        measures: [
          "FactSales.count",
          "FactSales.totalRevenue",
          "FactSales.totalCost",
          "FactSales.totalQuantity",
        ],

        filters: [],
      };

      if (selectedRegion !== "") {
        query.filters.push({
          member: "Region.regionName",
          operator: "equals",
          values: [selectedRegion],
        });
      }

      const range = getDateRange();

      if (range) {
        query.timeDimensions = [
          {
            dimension: "FactSales.saleDate",
            dateRange: range,
          },
        ];
      }

      const result = await cubejsApi.load(query);

      const row = result.rawData()[0] || {};

      setStats({
        sales: Number(row["FactSales.count"] || 0),

        revenue: Number(
          row["FactSales.totalRevenue"] || 0
        ),

        cost: Number(
          row["FactSales.totalCost"] || 0
        ),

        quantity: Number(
          row["FactSales.totalQuantity"] || 0
        ),
      });
    } catch (err) {
      console.error(err);

      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }, [selectedRegion, dateRange]);

  useEffect(() => {
    loadDashboard();

    loadRegions();

    const interval = setInterval(() => {
      loadDashboard();
    }, 60000);

    return () => clearInterval(interval);
  }, [loadDashboard, loadRegions]);

  if (loading) {
    return (
      <main className="dashboard">
        <Header
          title="Dashboard"
          subtitle="Loading Executive Dashboard..."
        />

        <h2
          style={{
            color: "#d4af37",
            marginTop: "60px",
          }}
        >
          Loading Business Intelligence...
        </h2>
      </main>
    );
  }

  if (error) {
    return (
      <main className="dashboard">
        <Header
          title="Dashboard"
          subtitle="Executive Dashboard"
        />

        <div
          style={{
            color: "#ff6b6b",
            marginTop: "50px",
          }}
        >
          {error}
        </div>
      </main>
    );
  }

  const profit =
    stats.revenue - stats.cost;

  const margin =
    stats.revenue === 0
      ? 0
      : (
          (profit / stats.revenue) *
          100
        ).toFixed(1);

  const averageOrder =
    stats.sales === 0
      ? 0
      : (
          stats.revenue / stats.sales
        ).toFixed(0);

        return (
    <main className="dashboard">
      <Header
        title="Dashboard"
        subtitle="Executive Business Intelligence Dashboard"
      />

      <DashboardFilters
        regions={regions}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      <ExecutiveKPIGrid
        revenue={stats.revenue}
        profit={profit}
        orders={stats.sales}
        quantity={stats.quantity}
        margin={margin}
        averageOrder={averageOrder}
      />

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "24px",
          marginTop: "30px",
        }}
      >
        <RevenueAnalytics
          selectedRegion={selectedRegion}
          dateRange={dateRange}
        />

        <AllInsights
          stats={stats}
          profit={profit}
          margin={margin}
        />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        <ExecutiveSummary stats={stats} />

        <ForecastPanel
          revenue={stats.revenue}
          profit={profit}
          quantity={stats.quantity}
        />
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginTop: "24px",
        }}
      >
        <RegionAnalytics
          selectedRegion={selectedRegion}
          dateRange={dateRange}
        />

        <ProductAnalytics
          selectedRegion={selectedRegion}
          dateRange={dateRange}
        />
      </section>
    </main>
  );
}

export default Dashboard;