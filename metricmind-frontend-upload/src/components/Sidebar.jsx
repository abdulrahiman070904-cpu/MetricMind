import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BarChart3,
  TrendingUp,
  Globe2,
  Package,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Revenue",
    path: "/revenue",
    icon: TrendingUp,
  },
  {
    title: "Regions",
    path: "/regions",
    icon: Globe2,
  },
  {
    title: "Products",
    path: "/products",
    icon: Package,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="sidebar"
      style={{
        width: collapsed ? "90px" : "260px",
        transition: "0.3s ease",
        overflow: "hidden",
      }}
    >
      <div className="sidebar-top">
        <div className="logo-box">MM</div>

        {!collapsed && (
          <div>
            <h2 className="logo-title">MetricMind</h2>
            <p className="logo-subtitle">Executive BI</p>
          </div>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginLeft: "auto",
            background: "transparent",
            border: "none",
            color: "#d4af37",
            cursor: "pointer",
          }}
        >
          {collapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              style={{
                justifyContent: collapsed ? "center" : "flex-start",
                transition: "0.3s ease",
                textDecoration: "none",
              }}
            >
              <Icon size={20} strokeWidth={2} />

              {!collapsed && (
                <span
                  style={{
                    marginLeft: "12px",
                  }}
                >
                  {item.title}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="sidebar-footer">
          <div className="footer-line"></div>

          <p>MetricMind v5.0</p>

          <small>Executive Business Intelligence</small>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;