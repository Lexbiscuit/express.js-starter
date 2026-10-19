import type {UserRepository} from "./user.repository.ts";
import {type User} from "@my-app/schema";

interface UserService {
  getUserById: (userId: number) => Promise<User | null>;
}

const createUserService = (userRepository: UserRepository): UserService => ({
  getUserById: async (userId) => await userRepository.findUserById(userId),
});

export {type UserService, createUserService};
