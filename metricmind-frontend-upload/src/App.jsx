import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Upcoming Modules */}
        <Route
          path="/analytics"
          element={
            <main className="dashboard">
              <h1 style={{ color: "#d4af37" }}>Analytics</h1>
              <p style={{ color: "#bdbdbd" }}>
                Analytics module coming next...
              </p>
            </main>
          }
        />

        <Route
          path="/revenue"
          element={
            <main className="dashboard">
              <h1 style={{ color: "#d4af37" }}>Revenue</h1>
              <p style={{ color: "#bdbdbd" }}>
                Revenue module coming soon...
              </p>
            </main>
          }
        />

        <Route
          path="/regions"
          element={
            <main className="dashboard">
              <h1 style={{ color: "#d4af37" }}>Regions</h1>
              <p style={{ color: "#bdbdbd" }}>
                Region analytics coming soon...
              </p>
            </main>
          }
        />

        <Route
          path="/products"
          element={
            <main className="dashboard">
              <h1 style={{ color: "#d4af37" }}>Products</h1>
              <p style={{ color: "#bdbdbd" }}>
                Product analytics coming soon...
              </p>
            </main>
          }
        />

        <Route
          path="/settings"
          element={
            <main className="dashboard">
              <h1 style={{ color: "#d4af37" }}>Settings</h1>
              <p style={{ color: "#bdbdbd" }}>
                Settings page coming soon...
              </p>
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;