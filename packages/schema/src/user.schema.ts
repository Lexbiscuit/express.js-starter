import {z} from "zod";
import {type Response, type Request} from "express";
import {DataResponseSchema, ErrorResponseSchema} from "./response.schema.ts";

export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;

// Add User
export const AddUserSchema = z.object({
  name: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
});

export type AddUserInput = z.infer<typeof AddUserSchema>;

export const AddUserResponseSchema = z.discriminatedUnion("success", [
  DataResponseSchema(UserSchema),
  ErrorResponseSchema,
]);
export type AddUserResponse = Response<z.infer<typeof AddUserResponseSchema>>;

// Get User
export const GetUserRequestSchema = z.object({
  userId: z.coerce.number({error: "Invalid id"}).positive({error: "Invalid id"}),
});

export type GetUserRequest = Request<z.infer<typeof GetUserRequestSchema>>;

export const GetUserResponseSchema = z.discriminatedUnion("success", [
  DataResponseSchema(UserSchema),
  ErrorResponseSchema,
]);

export type GetUserResponse = Response<z.infer<typeof GetUserResponseSchema>>;
