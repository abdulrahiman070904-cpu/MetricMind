import cubejs from "@cubejs-client/core";

const cubejsApi = cubejs(
  "metricmind_secret",
  {
    apiUrl: "http://localhost:4000/cubejs-api/v1"
  }
);

export default cubejsApi;