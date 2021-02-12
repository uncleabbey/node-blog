/* eslint-disable no-console */
import path from "path";
import { json } from "body-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import routes from "./routes";
import errorResponse from "./helpers/errorResponse";
import connectDatabase from "./db";
import getDb from "./helpers/getDb";
import swaggerDoc from "../swaggerDoc.json";
import strategy from "./helpers/strategy";

config();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
const app = express();
const port = process.env.PORT || 5000;
app.use(cors(corsOptions));

app.use(json());

/* istanbul ignore if */
if (process.env.NODE_ENV === "development") {
  app.use(morgan("tiny"));
}
const dbUrl = getDb(process.env.NODE_ENV);
connectDatabase(dbUrl);
app.use(passport.initialize());
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
strategy();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
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
