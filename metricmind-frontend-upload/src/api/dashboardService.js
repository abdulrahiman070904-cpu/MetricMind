import cubejsApi from "../cube";

export async function getDashboardStats(filters = {}) {
  const query = {
    measures: [
      "FactSales.count",
      "FactSales.totalRevenue",
      "FactSales.totalCost",
      "FactSales.totalQuantity",
    ],
    filters: [],
  };

  if (filters.region) {
    query.filters.push({
      member: "Region.regionName",
      operator: "equals",
      values: [filters.region],
    });
  }

  const resultSet = await cubejsApi.load(query);

  const row = resultSet.rawData()[0];

  const revenue = Number(row["FactSales.totalRevenue"] || 0);
  const cost = Number(row["FactSales.totalCost"] || 0);
  const quantity = Number(row["FactSales.totalQuantity"] || 0);
  const orders = Number(row["FactSales.count"] || 0);

  return {
    revenue,
    cost,
    quantity,
    orders,
    profit: revenue - cost,
    margin:
      revenue === 0
        ? 0
        : Number((((revenue - cost) / revenue) * 100).toFixed(2)),
    averageOrderValue:
      orders === 0 ? 0 : Number((revenue / orders).toFixed(2)),
  };
}