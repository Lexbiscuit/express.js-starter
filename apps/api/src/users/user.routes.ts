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
   *     tags:
   *       - User
   *     parameters:
   *       - in: path
   *         name: userId
   *         schema:
   *           type: integer
   *           minLength: 1
   *           example: 1
   *         required: true
   *         description: Numeric id of the user to get
   */
  router.get("/:userId", controller.getUser);

  /**
   * @openapi
   * /user:
   *   post:
   *     summary: Create a new user
   *     description: Creates a new user account with the provided name, password, and email.
   *     tags:
   *       - User
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *               - password
   *               - email
   *             properties:
   *               name:
   *                 type: string
   *                 minLength: 1
   *                 maxLength: 255
   *                 example: Jane Doe
   *               password:
   *                 type: string
   *                 minLength: 1
   *                 maxLength: 255
   *                 format: password
   *                 example: s3cr3tP@ss
   *               email:
   *                 type: string
   *                 minLength: 1
   *                 maxLength: 255
   *                 example: jane.doe@example.com
   *     responses:
   *       201:
   *         description: User created successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: string
   *                   example: 123e4567-e89b-12d3-a456-426614174000
   *                 name:
   *                   type: string
   *                   example: Jane Doe
   *                 email:
   *                   type: string
   *                   example: jane.doe@example.com
   *       400:
   *         description: Invalid request body (validation failed)
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Validation failed
   *       409:
   *         description: A user with the given email already exists
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 error:
   *                   type: string
   *                   example: Email already in use
   */
  router.post("/", controller.addUser);

  return router;
};
