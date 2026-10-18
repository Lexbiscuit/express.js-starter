import {Model, type InferAttributes, type InferCreationAttributes, DataTypes} from "sequelize";
import {sequelize} from "../config/database.ts";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare email: string;
  declare password_hash: string;
}

User.init(
  {
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password_hash: {type: DataTypes.STRING, allowNull: false},
  },
  {
    sequelize: sequelize,
    tableName: "users",
    modelName: "User",
  },
);

export {User};
