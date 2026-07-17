import { useEffect, useState } from "react";

function Header({
  title = "Dashboard",
  subtitle = "Executive Business Intelligence Dashboard",
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="dashboard-header">
      <div>
        <h1>{title}</h1>

        <p>{subtitle}</p>
      </div>

      <div
        className="header-right"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              color: "#d4af37",
              fontWeight: 600,
              fontSize: "18px",
            }}
          >
            {currentTime.toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>

          <div
            style={{
              color: "#bdbdbd",
              fontSize: "14px",
              marginTop: "4px",
            }}
          >
            {currentTime.toLocaleTimeString("en-IN")}
          </div>
        </div>

        <div
          style={{
            width: "46px",
            height: "46px",
            borderRadius: "50%",
            background: "#1d1d1d",
            border: "1px solid #d4af37",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#d4af37",
            fontSize: "20px",
            cursor: "pointer",
          }}
          title="Notifications"
        >
          🔔
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 14px",
            border: "1px solid rgba(212,175,55,.25)",
            borderRadius: "14px",
            background: "#1a1a1a",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#d4af37",
              color: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            A
          </div>

          <div>
            <div
              style={{
                color: "#ffffff",
                fontWeight: 600,
              }}
            >
              Admin
            </div>

            <div
              style={{
                color: "#9e9e9e",
                fontSize: "13px",
              }}
            >
              Executive
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;