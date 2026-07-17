import { useEffect, useState } from "react";
import cubejsApi from "../cube";

import Header from "../components/Header";
import DateFilter from "../components/DateFilter";
import KPICard from "../components/KPICard";
import SummaryCard from "../components/SummaryCard";
import ExecutiveInsights from "../components/ExecutiveInsights";
import ForecastCard from "../components/ForecastCard";
import RevenueChart from "../components/RevenueChart";
import RegionPieChart from "../components/RegionPieChart";
import ProductBarChart from "../components/ProductBarChart";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRegion, setSelectedRegion] = useState("");
  const [dateRange, setDateRange] = useState("all");

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

  const loadDashboard = async () => {
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

      const resultSet = await cubejsApi.load(query);

      const row = resultSet.rawData()[0] || {};

      setStats({
        sales: Number(row["FactSales.count"] || 0),
        revenue: Number(row["FactSales.totalRevenue"] || 0),
        cost: Number(row["FactSales.totalCost"] || 0),
        quantity: Number(row["FactSales.totalQuantity"] || 0),
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();

    const interval = setInterval(loadDashboard, 60000);

    return () => clearInterval(interval);
  }, [selectedRegion, dateRange]);

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>MetricMind</h1>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <h1>MetricMind</h1>

        <p>{error}</p>

        <button
          onClick={loadDashboard}
          style={{
            marginTop: 20,
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const profit = stats.revenue - stats.cost;

  const profitMargin =
    stats.revenue === 0
      ? 0
      : ((profit / stats.revenue) * 100).toFixed(1);

  const averageOrderValue =
    stats.sales === 0
      ? 0
      : (stats.revenue / stats.sales).toFixed(0);

  return (
    <main className="dashboard">
      <Header
        title="Dashboard"
        subtitle="Executive Business Intelligence Dashboard"
      />

      <div
        className="filter-bar"
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          <option value="North">North</option>
          <option value="South">South</option>
          <option value="East">East</option>
          <option value="West">West</option>
        </select>

        <DateFilter
          value={dateRange}
          onChange={setDateRange}
        />
      </div>

      <section className="kpi-grid">
        <KPICard
          title="TOTAL REVENUE"
          value={`₹ ${stats.revenue.toLocaleString()}`}
        />

        <KPICard
          title="TOTAL PROFIT"
          value={`₹ ${profit.toLocaleString()}`}
        />

        <KPICard
          title="TOTAL ORDERS"
          value={stats.sales.toLocaleString()}
        />

        <KPICard
          title="TOTAL QUANTITY"
          value={stats.quantity.toLocaleString()}
        />

        <KPICard
          title="PROFIT MARGIN"
          value={`${profitMargin}%`}
        />

        <KPICard
          title="AVG ORDER VALUE"
          value={`₹ ${Number(averageOrderValue).toLocaleString()}`}
        />
      </section>

      <section className="main-grid">
        <div className="summary-panel">
          <h2 className="panel-title">Executive Summary</h2>

          <SummaryCard stats={stats} />
        </div>

        <div className="revenue-panel">
          <h2 className="panel-title">Revenue Trend</h2>

          <RevenueChart
            selectedRegion={selectedRegion}
            dateRange={dateRange}
          />
        </div>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginTop: "30px",
        }}
      >
        <ExecutiveInsights stats={stats} />
        <ForecastCard stats={stats} />
      </section>

      <section className="bottom-grid">
        <div className="region-panel">
          <h2 className="panel-title">Region Distribution</h2>

          <RegionPieChart
            selectedRegion={selectedRegion}
            dateRange={dateRange}
          />
        </div>

        <div className="product-panel">
          <h2 className="panel-title">Product Performance</h2>

          <ProductBarChart
            selectedRegion={selectedRegion}
            dateRange={dateRange}
          />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;