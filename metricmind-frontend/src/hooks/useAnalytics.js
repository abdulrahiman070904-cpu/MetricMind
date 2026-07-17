import { useEffect, useState } from "react";
import {
  getAnalyticsData,
  getRevenueByRegion,
  getRevenueByProduct,
} from "../api/analyticsService";

export default function useAnalytics(filters) {
  const [trend, setTrend] = useState([]);
  const [totals, setTotals] = useState(null);
  const [regions, setRegions] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadAnalytics() {
      try {
        setLoading(true);
        setError(null);

        const [
          analytics,
          regionData,
          productData,
        ] = await Promise.all([
          getAnalyticsData(filters),
          getRevenueByRegion(filters),
          getRevenueByProduct(filters),
        ]);

        if (!cancelled) {
          setTrend(analytics.trend);
          setTotals(analytics.totals);
          setRegions(regionData);
          setProducts(productData);
        }
      } catch (err) {
        console.error("Analytics Error:", err);

        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadAnalytics();

    return () => {
      cancelled = true;
    };
  }, [filters.region, filters.dateRange]);

  return {
    trend,
    totals,
    regions,
    products,
    loading,
    error,
  };
}