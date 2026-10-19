import type {Sequelize} from "sequelize";
import {type User} from "@my-app/schema";
import {UserEntity} from "./user.entity.ts";

interface UserRepository {
  findUserById: (userId: number) => Promise<User | null>;
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

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
});

export {type UserRepository, createUserRepository};
