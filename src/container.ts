import express, { Router, Request } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import Database from "./lib/database";

// import resultsRouter from "./server/results";
// import questionsRouter from "./server/questions";
// import sinistresRouter from "./server/sinistres";
import passageRouter from './server/passage';

// import { ResultsService } from "./services/results.service";
// import { QuestionsService } from "./services/questions.service";
import PassageService from './services/passage.service';

export default function createContainer(database: Database) {
  // Middlewares
  const app = express();

  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());

  // Services
  const passageService = new PassageService(database);
//   const questionsService = new QuestionsService(database);
//   const historyService = new HistoryService(database);

  // Routing
//   const historyMiddleware = historyRouter(historyService);
//   const answersMiddleware = answersRouter(answersService);
  const passageMiddleware = passageRouter(passageService);
  const apiRouter = Router();
  apiRouter.use("/passage", passageMiddleware);
//   apiRouter.use("/questions", questionsMiddleware);
//   apiRouter.use("/history", historyMiddleware);

  app.use("/api", apiRouter);
  app.use("/public", express.static(path.resolve(__dirname, "..", "static")));

  return app;
}
