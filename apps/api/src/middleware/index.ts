import express, {type Express} from "express";
import {pinoHttp} from "pino-http";
import cors from "cors";
import cookieParser from "cookie-parser";
import timeout from "connect-timeout";
import swaggerJsdoc from "swagger-jsdoc";
import {apiReference} from "@scalar/express-api-reference";

const logger = pinoHttp({
  level: process.env.LOG_LEVEL || "info",
});

const ApiDefinition = swaggerJsdoc({
  failOnErrors: true,
  definition: {
    openapi: "3.1.0",
    info: {title: "Express Example", version: "1.0.0"},
  },
  apis: ["./src/**/*.ts"], // Path to your route files
});

/**
 * Adds a list of middleware to an Express app or router in order.
 * @param app - The Express app instance.
 */
function addMiddlewares(app: Express) {
  app.use(timeout(30000));
  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(
    "/reference",
    apiReference({
      url: "/openapi.json",
      showDeveloperTools: "localhost",
    }),
  );
}

export {haltOnTimeout} from "./haltOnTimeout.ts";
export {globalErrorHandler} from "./errorHandler.ts";
export {addMiddlewares, ApiDefinition};
