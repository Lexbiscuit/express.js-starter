import {sequelize} from "../config/database.ts";
import {createUserRouter} from "./user.routes.ts";
import {createUserController} from "./user.controller.ts";
import {createUserService} from "./user.service.ts";
import {createUserRepository} from "./user.repository.ts";

const userRepository = createUserRepository(sequelize);
const userService = createUserService(userRepository);
const UserController = createUserController(userService);
const userRouter = createUserRouter(UserController);

export {UserEntity} from "./user.entity.ts";
export {userRouter};
