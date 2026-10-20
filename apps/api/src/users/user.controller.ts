import type {UserService} from "./user.service.ts";
import * as UserDto from "@my-app/schema/user";
import type {NextFunction, Request} from "express";
import {z} from "zod";

export interface UserController {
  getUser: (
    req: UserDto.GetUserRequest,
    res: UserDto.GetUserResponse,
    next: NextFunction,
  ) => Promise<void>;
  addUser: (req: Request, res: UserDto.AddUserResponse) => Promise<void>;
}

export const createUserController = (userService: UserService): UserController => ({
  getUser: async (req, res) => {
    const {userId} = z.parse(UserDto.GetUserRequestSchema, req.params);
    const data = await userService.getUserById(userId);
    if (!data) {
      res.json({success: false, error: {code: "404", message: "User not found"}});
      return;
    }
    const user = UserDto.UserSchema.parse(data);
    res.json({success: true, data: user});
    return;
  },
  addUser: async (req, res) => {
    const body = await req.body;
    const bodyData = UserDto.CreateUserSchema.parse(body);
    const data = await userService.addUser(bodyData);
    res.json({success: true, data: data});
    return;
  },
});
