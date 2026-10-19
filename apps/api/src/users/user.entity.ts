import {sequelize} from "../config/database.ts";
import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type ModelStatic,
  type CreationOptional,
} from "sequelize";

interface UserInstance extends Model<
  InferAttributes<UserInstance>,
  InferCreationAttributes<UserInstance>
> {
  id: CreationOptional<number>;
  createdAt: CreationOptional<Date>;
  updatedAt: CreationOptional<Date>;
  name: string;
  email: string;
  password_hash: string;
}

const UserEntity = sequelize.define(
  "User",
  {
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password_hash: {type: DataTypes.STRING, allowNull: false},
  },
  {
    tableName: "users",
    modelName: "User",
    defaultScope: {
      attributes: {exclude: ["password_hash"]},
    },
  },
) as ModelStatic<UserInstance>;

export {UserEntity};
