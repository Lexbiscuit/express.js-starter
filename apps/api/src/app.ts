import express, {type Express, type Request, type Response} from "express";
import {pinoHttp} from "pino-http";

const app: Express = express();
const logger = pinoHttp({
  level: process.env.LOG_LEVEL || "info",
});

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! Refresh");
});

app.listen(3000);
