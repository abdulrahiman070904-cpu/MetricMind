cube(`FactSales`, {
  sql: `SELECT * FROM ANALYTICS.FACT_SALES`,

  joins: {
    Region: {
      relationship: `belongsTo`,
      sql: `${CUBE}.REGION_ID = ${Region}.REGION_ID`
    },

    Product: {
      relationship: `belongsTo`,
      sql: `${CUBE}.PRODUCT_ID = ${Product}.PRODUCT_ID`
    },

    Customer: {
      relationship: `belongsTo`,
      sql: `${CUBE}.CUSTOMER_ID = ${Customer}.CUSTOMER_ID`
    }
  },

  measures: {
    count: {
      type: `count`
    },

    totalRevenue: {
      sql: `REVENUE`,
      type: `sum`
    },

    totalCost: {
      sql: `COST`,
      type: `sum`
    },

    totalQuantity: {
      sql: `QUANTITY`,
      type: `sum`
    }
  },

  dimensions: {
    saleId: {
      sql: `SALE_ID`,
      type: `number`,
      primaryKey: true
    },

    customerId: {
      sql: `CUSTOMER_ID`,
      type: `number`
    },

    productId: {
      sql: `PRODUCT_ID`,
      type: `number`
    },

    regionId: {
      sql: `REGION_ID`,
      type: `number`
    },

    revenue: {
      sql: `REVENUE`,
      type: `number`
    },

    cost: {
      sql: `COST`,
      type: `number`
    },

    quantity: {
      sql: `QUANTITY`,
      type: `number`
    },

    saleDate: {
      sql: `SALE_DATE`,
      type: `time`
    }
  }
});