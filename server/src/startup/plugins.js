import cors from 'cors'
import bodyParser from 'body-parser'
import error from "../middlewares/error.js";

const startPlugins = (app) => {
  app.use(cors());
  app.use(bodyParser.json({ limit: "2mb" }));
  // app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  // app.use(express.json({ limit: '10kb' })); // Body limit is 10
  // app.use("/files", express.static(__dirname + "/../public"));
  app.use(error);
};

export default startPlugins
