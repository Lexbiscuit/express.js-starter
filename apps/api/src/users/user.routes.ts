import {Router} from "express";
import type {UserController} from "./user.controller.ts";

export const createUserRouter = (controller: UserController): Router => {
  const router = Router();

  /**
   * @openapi
   * /user/{userId}:
   *   get:
   *     summary: Find a user by id
   *     description: Fetches a user based on their id from the database.
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: integer
   *         required: true
   *         description: Numeric id of the user to get
   */
  router.get("/:userId", controller.getUser);

  return router;
};
