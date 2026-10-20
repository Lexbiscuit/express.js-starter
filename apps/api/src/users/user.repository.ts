import type {Sequelize} from "sequelize";
import {type User, UserSchema, type CreateUserInput} from "@my-app/schema/user";
import {UserEntity} from "./user.entity.ts";

interface UserRepository {
  findUserById: (userId: number) => Promise<User | null>;
  createUser: (userData: CreateUserInput) => Promise<User>;
}

const createUserRepository = (_db: Sequelize): UserRepository => ({
  findUserById: async (userId) => {
    const user = await UserEntity.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return null;
    }

    return UserSchema.parse(user);
  },
  createUser: async (userData) => {
    const user = await UserEntity.create({
      name: userData.name,
      email: userData.email,
      password_hash: userData.password,
    });

    return UserSchema.parse(user);
  },
});

export {type UserRepository, createUserRepository};
