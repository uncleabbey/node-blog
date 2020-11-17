/* eslint-disable no-console */
import path from "path";
import { json } from "body-parser";
import { config } from "dotenv";
import express from "express";
// import swaggerJsdoc from "swagger-jsdoc";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import errorResponse from "./helpers/errorResponse";
import connectDatabase from "./db";
import getDb from "./helpers/getDb";
import swaggerDoc from "../swaggerDoc.json";

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(json());
/* istanbul ignore if */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}
const dbUrl = getDb(process.env.NODE_ENV);
connectDatabase(dbUrl);
app.get("/", (req, res) => {
  res.set("Content-Type", "text/html");
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.use("/api/v1", routes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    error: "404 Page Not Found",
  });
});
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  return errorResponse(res, error);
});
app.listen(port, () =>
  console.log(`server is listening on port: ${port}`)
);
export default app;
