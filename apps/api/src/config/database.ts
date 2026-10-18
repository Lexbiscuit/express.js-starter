import {Sequelize} from "sequelize";
import {logger} from "./logger.ts";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  pool: {
    min: 0,
    max: 10,
    acquire: 30000,
    idle: 10000,
  },
});

async function connectDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    logger.info("Connection has been established successfully.");
  } catch (error) {
    logger.error(
      `Unable to connect to the database: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
}

export {sequelize, connectDatabase};
