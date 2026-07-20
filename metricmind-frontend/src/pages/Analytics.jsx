import { useEffect, useState } from "react";
import cubejsApi from "../cube";

import Header from "../components/Header";
import KPICard from "../components/KPICard";
import RevenueChart from "../components/RevenueChart";
import RegionPieChart from "../components/RegionPieChart";
import ProductBarChart from "../components/ProductBarChart";

function Analytics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const resultSet = await cubejsApi.load({
        measures: [
          "FactSales.count",
          "FactSales.totalRevenue",
          "FactSales.totalCost",
          "FactSales.totalQuantity",
        ],
      });

      const row = resultSet.rawData()[0] || {};

      setStats({
        orders: Number(row["FactSales.count"] || 0),
        revenue: Number(row["FactSales.totalRevenue"] || 0),
        cost: Number(row["FactSales.totalCost"] || 0),
        quantity: Number(
          row["FactSales.totalQuantity"] || 0
        ),
      });
    } catch (err) {
      console.error(err);
      setError("Unable to load analytics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();

    const interval = setInterval(
      loadAnalytics,
      60000
    );

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="loading-screen">
        <h1>MetricMind</h1>
        <p>Loading Analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loading-screen">
        <h1>MetricMind</h1>

        <p>{error}</p>

        <button
          onClick={loadAnalytics}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            borderRadius: "10px",
            border: "none",
            background: "#d4af37",
            color: "#111",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  const profit =
    stats.revenue - stats.cost;

  const profitMargin =
    stats.revenue === 0
      ? 0
      : (
          (profit / stats.revenue) *
          100
        ).toFixed(1);

  const averageOrderValue =
    stats.orders === 0
      ? 0
      : Math.round(
          stats.revenue / stats.orders
        );

  return (
    <main className="dashboard">

      <Header
        title="Analytics"
        subtitle="Sales Performance & Trend Analysis"
      />

      {/* KPI SECTION */}
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
          value={stats.orders.toLocaleString()}
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
          value={`₹ ${averageOrderValue.toLocaleString()}`}
        />

      </section>

      {/* REVENUE ANALYSIS */}
      <section className="main-grid">

        <div className="revenue-panel">

          <h2 className="panel-title">
            Revenue vs Profit Analysis
          </h2>

          <RevenueChart
            selectedRegion=""
            dateRange="all"
          />

        </div>

        <div className="summary-panel">

          <h2 className="panel-title">
            Analytics Summary
          </h2>

          <div className="summary-box">

            <div className="summary-item">
              <span>Total Revenue</span>

              <strong>
                ₹ {stats.revenue.toLocaleString()}
              </strong>
            </div>

            <div className="summary-item">
              <span>Total Profit</span>

              <strong>
                ₹ {profit.toLocaleString()}
              </strong>
            </div>

            <div className="summary-item">
              <span>Profit Margin</span>

              <strong>
                {profitMargin}%
              </strong>
            </div>

            <div className="summary-item">
              <span>Average Order Value</span>

              <strong>
                ₹ {averageOrderValue.toLocaleString()}
              </strong>
            </div>

            <div className="summary-item">
              <span>Total Quantity</span>

              <strong>
                {stats.quantity.toLocaleString()}
              </strong>
            </div>

          </div>

        </div>

      </section>

      {/* REGION + PRODUCT */}
      <section className="bottom-grid">

        <div className="region-panel">

          <h2 className="panel-title">
            Region Distribution
          </h2>

          <RegionPieChart
            selectedRegion=""
            dateRange="all"
          />

        </div>

        <div className="product-panel">

          <h2 className="panel-title">
            Product Performance
          </h2>

          <ProductBarChart
            selectedRegion=""
            dateRange="all"
          />

        </div>

      </section>

    </main>
  );
}

export default Analytics;