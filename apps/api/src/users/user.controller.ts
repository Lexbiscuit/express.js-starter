import type {Request, Response} from "express";
import type {UserService} from "./user.service.ts";
import {z} from "zod";

const GetUserRequestSchema = z.object({
  userId: z.coerce.number({error: "Invalid id"}).positive({error: "Invalid id"}),
});
type GetUserRequest = Request<z.infer<typeof GetUserRequestSchema>>;

interface UserController {
  getUser: (req: GetUserRequest, res: Response) => Promise<void>;
}

const createUserController = (userService: UserService): UserController => ({
  getUser: async (req, res) => {
    const {userId} = z.parse(GetUserRequestSchema, req.params);
    res.json(await userService.getUserById(userId));
    return;
  },
});

export {type UserController, createUserController};
