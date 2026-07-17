import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/dashboardService";

export default function useDashboard(filters) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const data = await getDashboardStats(filters);

        if (!cancelled) {
          setStats(data);
        }
      } catch (err) {
        console.error("Dashboard Error:", err);

        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [filters.region, filters.dateRange]);

  return {
    stats,
    loading,
    error,
  };
}