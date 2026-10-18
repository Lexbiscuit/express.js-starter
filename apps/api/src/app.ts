import express, {type Express, type Request, type Response} from "express";
import {addMiddlewares} from "./middleware/index.ts";
import {connectDatabase} from "./config/index.ts";

const app: Express = express();
addMiddlewares(app);

await connectDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! Refresh");
});

app.listen(3000);
