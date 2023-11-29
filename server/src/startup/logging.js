import winston from 'winston'
require("express-async-errors");

const logger = winston.createLogger({
  // level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
  ],
});

export default () => {
  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  winston.exceptions.handle(
    logger.add(
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      logger.add(
        new winston.transports.File({ filename: "uncaughtExceptions.log" })
      )
    )
  );
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  //winston.add(winston.transports.File, { filename: 'logFile.log' });
  // winston.add(winston.transports.MongoDB, {
  //   db: config.get('db'),
  //   level: 'info'
  // });
};
