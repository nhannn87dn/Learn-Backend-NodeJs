import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { getEnv } from "./env";


const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger & Mongoose",
      version: "1.0.0",
      description: "REST API docs for Express + Mongoose project",
    },
    servers: [
      {
        url: `http://localhost:${getEnv().PORT}/api/v1`,
      },
    ],
  },
  apis: ["./src/routes/v1/*.ts", "./src/models/*.ts"], // nơi swagger-jsdoc scan
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
