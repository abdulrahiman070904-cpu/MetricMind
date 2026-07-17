function DateFilter({
  value,
  onChange,
  label = "Date Range",
}) {
  return (
    <div
      className="date-filter"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        minWidth: "180px",
      }}
    >
      <label
        style={{
          color: "#bdbdbd",
          fontSize: "13px",
          fontWeight: 500,
        }}
      >
        {label}
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "#1b1b1b",
          color: "#fff",
          border: "1px solid rgba(212,175,55,.25)",
          borderRadius: "12px",
          padding: "12px 14px",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="all">All Time</option>
        <option value="7">Last 7 Days</option>
        <option value="30">Last 30 Days</option>
        <option value="90">Last 90 Days</option>
        <option value="365">This Year</option>
      </select>
    </div>
  );
}

export default DateFilter;