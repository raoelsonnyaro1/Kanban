import mongoose from "mongoose";
import winston from "winston";

export const initDB = () => {
  const db = process.env.DB_URL;
  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
    ],
  });
  mongoose.connect(db).then(() => logger.info(`Connected to ${db}...`));
};
