import { useEffect, useState } from "react";
import cubejsApi from "./cube";

import "./App.css";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import KPICard from "./components/KPICard";
import SummaryCard from "./components/SummaryCard";

import RevenueChart from "./components/RevenueChart";
import RegionPieChart from "./components/RegionPieChart";
import ProductBarChart from "./components/ProductBarChart";

function App() {
  const [stats, setStats] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const query = {
      measures: [
        "FactSales.count",
        "FactSales.totalRevenue",
        "FactSales.totalCost",
        "FactSales.totalQuantity",
      ],
    };

    if (selectedRegion !== "") {
      query.filters = [
        {
          member: "Region.regionName",
          operator: "equals",
          values: [selectedRegion],
        },
      ];
    }

    cubejsApi.load(query).then((resultSet) => {
      const row = resultSet.rawData()[0];

      setStats({
        sales: row["FactSales.count"],
        revenue: row["FactSales.totalRevenue"],
        cost: row["FactSales.totalCost"],
        quantity: row["FactSales.totalQuantity"],
      });
    });
  }, [selectedRegion]);

  if (!stats) {
    return (
      <div className="loading-screen">
        <h1>MetricMind</h1>
        <p>Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="dashboard">
        <Header />

        <div className="filter-bar">
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
        </div>

        <section className="kpi-grid">
          <KPICard
            title="TOTAL SALES"
            value={stats.sales}
          />

          <KPICard
            title="TOTAL REVENUE"
            value={`₹ ${Number(stats.revenue).toLocaleString()}`}
          />

          <KPICard
            title="TOTAL COST"
            value={`₹ ${Number(stats.cost).toLocaleString()}`}
          />

          <KPICard
            title="TOTAL QUANTITY"
            value={stats.quantity}
          />
        </section>

        <section className="main-grid">
          <div className="summary-panel">
            <h2 className="panel-title">
              Executive Summary
            </h2>

            <SummaryCard stats={stats} />
          </div>

          <div className="revenue-panel">
            <h2 className="panel-title">
              Revenue Trend
            </h2>

            <RevenueChart selectedRegion={selectedRegion} />
          </div>
        </section>

        <section className="bottom-grid">
          <div className="region-panel">
            <h2 className="panel-title">
              Region Distribution
            </h2>

            <RegionPieChart selectedRegion={selectedRegion} />
          </div>

          <div className="product-panel">
            <h2 className="panel-title">
              Product Performance
            </h2>

            <ProductBarChart selectedRegion={selectedRegion} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;