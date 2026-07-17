import cubejsApi from "../cube";

export async function getAnalyticsData(filters = {}) {
  const query = {
    measures: [
      "FactSales.totalRevenue",
      "FactSales.totalCost",
      "FactSales.totalQuantity",
      "FactSales.count",
    ],
    dimensions: ["FactSales.saleDate"],
    timeDimensions: [
      {
        dimension: "FactSales.saleDate",
        granularity: "month",
      },
    ],
    order: {
      "FactSales.saleDate": "asc",
    },
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

  const raw = resultSet.rawData();

  const trend = raw.map((row) => {
    const revenue = Number(row["FactSales.totalRevenue"] || 0);
    const cost = Number(row["FactSales.totalCost"] || 0);

    return {
      month: row["FactSales.saleDate.month"],
      revenue,
      profit: revenue - cost,
      quantity: Number(row["FactSales.totalQuantity"] || 0),
      orders: Number(row["FactSales.count"] || 0),
    };
  });

  const totals = trend.reduce(
    (acc, item) => {
      acc.revenue += item.revenue;
      acc.profit += item.profit;
      acc.orders += item.orders;
      acc.quantity += item.quantity;
      return acc;
    },
    {
      revenue: 0,
      profit: 0,
      orders: 0,
      quantity: 0,
    }
  );

  return {
    trend,
    totals,
  };
}

export async function getRevenueByRegion() {
  const resultSet = await cubejsApi.load({
    measures: ["FactSales.totalRevenue"],
    dimensions: ["Region.regionName"],
    order: {
      "FactSales.totalRevenue": "desc",
    },
  });

  return resultSet.rawData().map((row) => ({
    region: row["Region.regionName"],
    revenue: Number(row["FactSales.totalRevenue"]),
  }));
}

export async function getRevenueByProduct() {
  const resultSet = await cubejsApi.load({
    measures: ["FactSales.totalRevenue"],
    dimensions: ["Product.productName"],
    order: {
      "FactSales.totalRevenue": "desc",
    },
  });

  return resultSet.rawData().map((row) => ({
    product: row["Product.productName"],
    revenue: Number(row["FactSales.totalRevenue"]),
  }));
}