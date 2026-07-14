cube(`Customer`, {
  sql: `SELECT * FROM ANALYTICS.DIM_CUSTOMER`,

  dimensions: {
    customerId: {
      sql: `CUSTOMER_ID`,
      type: `number`,
      primaryKey: true
    },

    customerName: {
      sql: `CUSTOMER_NAME`,
      type: `string`
    }
  }
});