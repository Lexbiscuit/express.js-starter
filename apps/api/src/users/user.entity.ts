import {sequelize} from "../config/database.ts";
import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
  type CreationOptional,
} from "sequelize";

class UserEntity extends Model<InferAttributes<UserEntity>, InferCreationAttributes<UserEntity>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password_hash: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserEntity.init(
  {
    id: {type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password_hash: {type: DataTypes.STRING, allowNull: false},
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "users",
    modelName: "User",
  },
);

export {UserEntity};
