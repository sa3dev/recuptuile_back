import express, { Router, Request } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import Database from "./lib/database";

// nos routes avec appel au bon controller
import passageRouter from './server/passage';

// import des bon services pour l'injection au controller
import PassageService from './services/passage.service';

export default function createContainer(database: Database) {
  // Middlewares
  const app = express();

  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());

  // Services avec appelle a la database
  const passageService = new PassageService(database);

  // Routing
  const passageMiddleware = passageRouter(passageService);
  const apiRouter = Router();
  apiRouter.use("/passage", passageMiddleware);

  app.use("/api", apiRouter);
  app.use("/public", express.static(path.resolve(__dirname, "..", "static")));

  return app;
}
