import type {NextFunction, Request, Response} from "express";

function haltOnTimeout(req: Request, res: Response, next: NextFunction) {
  if (!req.timedout) {
    next();
  }
}

export {haltOnTimeout};
