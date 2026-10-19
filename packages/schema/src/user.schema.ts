import {z} from "zod";

const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
});

type User = z.infer<typeof UserSchema>;

const CreateUserSchema = z.object({
  name: z.string().min(1).max(255),
  password: z.string().min(1).max(255),
  email: z.string().min(1).max(255),
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;

export {type User, type CreateUserInput};
