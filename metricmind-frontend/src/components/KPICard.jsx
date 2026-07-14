function KPICard({ title, value }) {
  return (
    <div className="kpi-card">

      <span className="kpi-title">
        {title}
      </span>

      <h2 className="kpi-value">
        {value}
      </h2>

    </div>
  );
}

export default KPICard;