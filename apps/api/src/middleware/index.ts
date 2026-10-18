import express, {type Express} from "express";
import {pinoHttp} from "pino-http";
import cors from "cors";
import cookieParser from "cookie-parser";
import timeout from "connect-timeout";

const logger = pinoHttp({
  level: process.env.LOG_LEVEL || "info",
});

export {haltOnTimeout} from "./haltOnTimeout.ts";

/**
 * Adds a list of middleware to an Express app or router in order.
 * @param app - The Express app instance.
 */
export function addMiddlewares(app: Express) {
  app.use(timeout(30000));
  app.use(logger);
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
}
