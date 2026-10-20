import type {UserRepository} from "./user.repository.ts";
import {type User, type AddUserInput} from "@my-app/schema/user";

interface UserService {
  getUserById: (userId: number) => Promise<User | null>;
  addUser: (userData: AddUserInput) => Promise<User>;
}

const createUserService = (userRepository: UserRepository): UserService => ({
  getUserById: async (userId) => await userRepository.findUserById(userId),
  addUser: async (userData) => userRepository.createUser(userData),
});

export {type UserService, createUserService};
