const getDb = (env) => {
  if (env === "test") {
    return process.env.TEST_DB_URL;
  }
  if (env === "development") {
    return process.env.DEV_DB_URL;
  }
  if (env === "production") {
    return process.env.PROD_DB_URL;
  }
  throw new Error("wrong env");
};
export default getDb;
