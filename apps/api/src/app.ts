import express, {type Express, type Request, type Response} from "express";
import {addMiddlewares, ApiDefinition, globalErrorHandler} from "./middleware/index.ts";
import {connectDatabase} from "./config/index.ts";
import {userRouter} from "./users/index.ts";

const app: Express = express();
addMiddlewares(app);

await connectDatabase();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/openapi.json", (_req, res) => {
  res.json(ApiDefinition);
});

app.use("/user", userRouter);
app.use((_req, res) => {
  res.status(404).json({status: "fail", message: "Route not found"});
});
app.use(globalErrorHandler);

app.listen(3000);
