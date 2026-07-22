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
  const [stats, setStats] = useState({
    revenue: 0,
    cost: 0,
    sales: 0,
    quantity: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedRegion, setSelectedRegion] = useState("");
  const [dateRange, setDateRange] = useState("all");

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================
  async function loadDashboard() {
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

      // Region filter
      if (selectedRegion) {
        query.filters.push({
          member: "Region.regionName",
          operator: "equals",
          values: [selectedRegion],
        });
      }

      console.log("Dashboard Query:", query);

      const resultSet = await cubejsApi.load(query);

      const data = resultSet.rawData();

      console.log("Dashboard Cube Data:", data);

      const row = data[0] || {};

      setStats({
        revenue: Number(row["FactSales.totalRevenue"] || 0),
        cost: Number(row["FactSales.totalCost"] || 0),
        sales: Number(row["FactSales.count"] || 0),
        quantity: Number(row["FactSales.totalQuantity"] || 0),
      });
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // LOAD DATA WHEN FILTERS CHANGE
  // ==========================================
  useEffect(() => {
   useEffect(() => {
  loadDashboard();

  const interval = setInterval(() => {
    loadDashboard();
  }, 60000);

  return () => {
    clearInterval(interval);
  };
}, [selectedRegion, dateRange]);

  // ==========================================
  // CALCULATIONS
  // ==========================================
  const profit = stats.revenue - stats.cost;

  const profitMargin =
    stats.revenue > 0
      ? ((profit / stats.revenue) * 100).toFixed(1)
      : "0.0";

  const averageOrderValue =
    stats.sales > 0
      ? Math.round(stats.revenue / stats.sales)
      : 0;

  // ==========================================
  // LOADING SCREEN
  // ==========================================
  if (loading) {
    return (
      <div className="loading-screen">
        <h1>MetricMind</h1>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  // ==========================================
  // ERROR SCREEN
  // ==========================================
  if (error) {
    return (
      <div className="loading-screen">
        <h1>MetricMind</h1>

        <p>{error}</p>

        <button
          onClick={loadDashboard}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================
  return (
    <main className="dashboard">

      {/* HEADER */}
      <Header
        title="Dashboard"
        subtitle="Executive Business Intelligence Dashboard"
      />

      {/* FILTERS */}
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

      {/* KPI CARDS */}
      <section className="kpi-grid">

        <KPICard
          title="TOTAL REVENUE"
          value={`₹ ${stats.revenue.toLocaleString("en-IN")}`}
        />

        <KPICard
          title="TOTAL PROFIT"
          value={`₹ ${profit.toLocaleString("en-IN")}`}
        />

        <KPICard
          title="TOTAL ORDERS"
          value={stats.sales.toLocaleString("en-IN")}
        />

        <KPICard
          title="TOTAL QUANTITY"
          value={stats.quantity.toLocaleString("en-IN")}
        />

        <KPICard
          title="PROFIT MARGIN"
          value={`${profitMargin}%`}
        />

        <KPICard
          title="AVG ORDER VALUE"
          value={`₹ ${averageOrderValue.toLocaleString("en-IN")}`}
        />

      </section>

      {/* EXECUTIVE SUMMARY + REVENUE */}
      <section className="main-grid">

        <div className="summary-panel">

          <h2 className="panel-title">
            Executive Summary
          </h2>

          <SummaryCard
            stats={stats}
          />

        </div>

        <div className="revenue-panel">

          <h2 className="panel-title">
            Revenue Trend
          </h2>

          <RevenueChart
            selectedRegion={selectedRegion}
            dateRange={dateRange}
          />

        </div>

      </section>

      {/* INSIGHTS + FORECAST */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginTop: "30px",
        }}
      >

        <ExecutiveInsights
          stats={stats}
        />

        <ForecastCard
          stats={stats}
        />

      </section>

      {/* REGION + PRODUCT */}
      <section className="bottom-grid">

        <div className="region-panel">

          <h2 className="panel-title">
            Region Distribution
          </h2>

          <RegionPieChart
            selectedRegion={selectedRegion}
            dateRange={dateRange}
          />

        </div>

        <div className="product-panel">

          <h2 className="panel-title">
            Product Performance
          </h2>

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