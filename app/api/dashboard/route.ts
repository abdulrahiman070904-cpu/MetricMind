import { NextRequest } from "next/server";

const fallback = {
  North: { revenue: 3284000, profit: 1048000, orders: 1248 },
  South: { revenue: 2672000, profit: 828000, orders: 1074 },
  East: { revenue: 2416000, profit: 716000, orders: 936 },
  West: { revenue: 3108000, profit: 1092000, orders: 1196 },
};

type Region = keyof typeof fallback;

function demoStats(region: string, period: string) {
  const base = region in fallback ? fallback[region as Region] : Object.values(fallback).reduce((sum, item) => ({ revenue: sum.revenue + item.revenue, profit: sum.profit + item.profit, orders: sum.orders + item.orders }), { revenue: 0, profit: 0, orders: 0 });
  const scale = period === "Last 30 days" ? 0.18 : period === "Last quarter" ? 0.28 : 1;
  return { revenue: Math.round(base.revenue * scale), profit: Math.round(base.profit * scale), orders: Math.round(base.orders * scale), source: "demo" as const };
}

export async function GET(request: NextRequest) {
  const region = request.nextUrl.searchParams.get("region") ?? "All regions";
  const period = request.nextUrl.searchParams.get("period") ?? "This year";
  const apiUrl = process.env.CUBE_API_URL;
  const token = process.env.CUBE_API_TOKEN;

  if (!apiUrl || !token) return Response.json(demoStats(region, period));

  const query = {
    measures: ["FactSales.count", "FactSales.totalRevenue", "FactSales.totalCost"],
    filters: region === "All regions" ? [] : [{ member: "Region.regionName", operator: "equals", values: [region] }],
  };

  try {
    const response = await fetch(`${apiUrl.replace(/\/$/, "")}/load?query=${encodeURIComponent(JSON.stringify(query))}`, { headers: { Authorization: token }, cache: "no-store" });
    if (!response.ok) throw new Error(`Cube request failed with ${response.status}`);
    const payload = await response.json();
    const row = payload.data?.[0];
    if (!row) throw new Error("Cube returned no dashboard rows");
    const revenue = Number(row["FactSales.totalRevenue"] ?? 0);
    const cost = Number(row["FactSales.totalCost"] ?? 0);
    return Response.json({ revenue, profit: revenue - cost, orders: Number(row["FactSales.count"] ?? 0), source: "cube" as const });
  } catch (error) {
    console.error("Cube dashboard request failed", error);
    return Response.json(demoStats(region, period), { headers: { "X-MetricMind-Data-Mode": "demo-fallback" } });
  }
}
