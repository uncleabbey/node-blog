const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const router = express.Router();

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
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/index.js"],
};

const specs = swaggerJsdoc(options);
router.get(
  "",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

module.exports = router;
