// import authentication from '../middlewares/auth.js'
import auth from "../routes/auth.js";
import user from "../routes/user.js";
import departement from "../routes/departement.js";
import client from "../routes/client.js";
import project from "../routes/project.js";
import task from "../routes/task.js";
import enterprise from "../routes/enterprise.js";
import seeder from "../routes/seeder.js";

// import swaggerUI from "swagger-ui-express";
// import swaggerDoc from "./swagger.json" assert { type: "json" };

const apiVersion = process.env.API_VERSION || "v1";

const mainRouter = (app) => {
  // app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  app.use(`/api/${apiVersion}/auth`, auth);
  app.use(`/api/${apiVersion}/users`, user);
  app.use(`/api/${apiVersion}/departements`, departement);
  app.use(`/api/${apiVersion}/clients`, client);
  app.use(`/api/${apiVersion}/projects`, project);
  app.use(`/api/${apiVersion}/tasks`, task);
  app.use(`/api/${apiVersion}/enterprises`, enterprise);

  app.use(`/api/${apiVersion}/seeder`, seeder);
};

export default mainRouter;
