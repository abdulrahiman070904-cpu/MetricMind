cube(`Product`, {
  sql: `SELECT * FROM ANALYTICS.DIM_PRODUCT`,

  dimensions: {
    productId: {
      sql: `PRODUCT_ID`,
      type: `number`,
      primaryKey: true
    },

    productName: {
      sql: `PRODUCT_NAME`,
      type: `string`
    }
  }
});