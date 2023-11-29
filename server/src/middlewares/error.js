// const winston = require("winston");

export default (err, req, res, next) => {
  console.error(err.message, err);
  console.log("==>", err);
  res.status(500).send("Something failed...");
};
