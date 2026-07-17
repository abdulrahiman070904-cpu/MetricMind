import Header from "../components/Header";

function Analytics() {
  return (
    <main className="dashboard">
      <Header
        title="Analytics"
        subtitle="Sales Performance & Trend Analysis"
      />

      <section className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-title">MONTHLY SALES</span>
          <h2 className="kpi-value">--</h2>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">REVENUE GROWTH</span>
          <h2 className="kpi-value">--</h2>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">PROFIT GROWTH</span>
          <h2 className="kpi-value">--</h2>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">TOP REGION</span>
          <h2 className="kpi-value">--</h2>
        </div>
      </section>

      <section className="main-grid">
        <div className="revenue-panel">
          <h2 className="panel-title">
            Revenue vs Profit Analysis
          </h2>

          <div
            style={{
              height: "420px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#888",
              fontSize: "18px",
            }}
          >
            Revenue vs Profit Chart
          </div>
        </div>

        <div className="summary-panel">
          <h2 className="panel-title">
            Analytics Summary
          </h2>

          <div className="summary-box">
            <div className="summary-item">
              <span>Monthly Growth</span>
              <strong>--</strong>
            </div>

            <div className="summary-item">
              <span>Best Performing Region</span>
              <strong>--</strong>
            </div>

            <div className="summary-item">
              <span>Top Product</span>
              <strong>--</strong>
            </div>

            <div className="summary-item">
              <span>Forecast</span>
              <strong>--</strong>
            </div>
          </div>
        </div>
      </section>

      <section
        className="product-panel"
        style={{
          marginTop: "24px",
        }}
      >
        <h2 className="panel-title">
          Top Products
        </h2>

        <div
          style={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#888",
            fontSize: "18px",
          }}
        >
          Top Products Table
        </div>
      </section>
    </main>
  );
}

export default Analytics;