import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import plugins from "./startup/plugins.js";
import routes from "./startup/routes.js";
import { initDB } from "./startup/db.js";
const app = express();

plugins(app);
routes(app);
initDB();

// ========== clustering
// import cluster from "cluster";
// import { cpus } from "os";
// import { start } from "repl";
// const numWorkers = cpus().length;
// const isPrimary = cluster.isPrimary;
// ========== clustering

const port = process.env.PORT || 5000;

// if (isPrimary) {
//   console.log(`Forking ${numWorkers} workers`);
//   const workers = [...Array(numWorkers)].map((_) => cluster.fork());

//   cluster.on("online", (worker) =>
//     console.log(`Worker ${worker.process.pid} is online`)
//   );
//   cluster.on("exit", (worker, exitCode) => {
//     console.log(`Worker ${worker.process.id} exited with code ${exitCode}`);
//     console.log(`Starting a new worker`);
//     cluster.fork();
//   });
// } else {
const server = app.listen(port, () =>
  console.log(`App running on port http://localhost:${port} ...`)
);
// }

export default server;
