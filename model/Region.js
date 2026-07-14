cube(`Region`, {
  sql: `SELECT * FROM ANALYTICS.DIM_REGION`,

  dimensions: {
    regionId: {
      sql: `REGION_ID`,
      type: `number`,
      primaryKey: true
    },

    regionName: {
      sql: `REGION_NAME`,
      type: `string`
    }
  }
});