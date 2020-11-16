/* eslint-disable no-console */
import path from "path";
import { json } from "body-parser";
import { config } from "dotenv";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import errorResponse from "./helpers/errorResponse";
import connectDatabase from "./db";
import getDb from "./helpers/getDb";

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

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Uncleabbey",
        url: "http://uncleabbey.github.io/",
        email: "gabkay007@gmail.com",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    servers: [
      {
        url: "https://uncleabbey-blog.herokuapp.com/api/v1",
      },
      {
        url: "http://localhost:3000/api/v1",
      },
    ],
  },
  apis: ["src/routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

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
