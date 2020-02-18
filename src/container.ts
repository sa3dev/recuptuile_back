import express, { Router, Request } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import Database from "./lib/database";

// import resultsRouter from "./server/results";
// import questionsRouter from "./server/questions";
// import historyRouter from "./server/history";
// import answersRouter from "./server/answers";
// import workflowRouter from "./server/workflow_categories";
// import helpsRouter from "./server/helps";
// import answersTypeRouter from "./server/answers-types";
// import formulasRouter from "./server/formulas";
// import timersStepsRouter from "./server/timers-steps";
// import statesRouter from "./server/states";
// import sinistresRouter from "./server/sinistres";

// import { ResultsService } from "./services/results.service";
// import { QuestionsService } from "./services/questions.service";
// import { HistoryService } from "./services/history.service";
// import { AnswersService } from "./services/answers.service";
// import { WorkflowCategoriesService } from "./services/workflow_categories.service";
// import { HelpsService } from "./services/helps.service";
// import { AnswersTypesService } from "./services/answers-types.service";
// import { FormulasService } from "./services/formulas.service";
// import { TimersStepsService } from "./services/timers-steps.service";
// import { StatesService } from "./services/states.service";
// import { SinistresService } from "./services/sinistres.service";

export default function createContainer(database: Database) {
  // Middlewares
  const app = express();

  app.use(morgan("dev"));
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());

  // Services
//   const resultsService = new ResultsService(database);
//   const questionsService = new QuestionsService(database);
//   const historyService = new HistoryService(database);
//   const answersService = new AnswersService(database);
//   const workflowCategoriesService = new WorkflowCategoriesService(database);
//   const helpersService = new HelpsService(database);
//   const answersTypesService = new AnswersTypesService(database);
//   const formulasService = new FormulasService(database);
//   const timersStrepService = new TimersStepsService(database);
//   const statesService = new StatesService(database);
//   const sinistresService = new SinistresService(database);

  // Routing
//   const resultsMiddleware = resultsRouter(resultsService, formulasService);
//   const questionsMiddleware = questionsRouter(
//     questionsService,
//     answersService,
//     helpersService
//   );
//   const historyMiddleware = historyRouter(historyService);
//   const answersMiddleware = answersRouter(answersService);
//   const workflowCatMiddleware = workflowRouter(workflowCategoriesService);
//   const helpsMiddleware = helpsRouter(helpersService);
//   const answersTypeMiddleware = answersTypeRouter(answersTypesService);
//   const formulasMiddleware = formulasRouter(formulasService);
//   const timersStepMiddleware = timersStepsRouter(timersStrepService);
//   const statesMiddleware = statesRouter(statesService);
//   const sinistresMiddleware = sinistresRouter(sinistresService);

  const apiRouter = Router();
//   apiRouter.use("/results", resultsMiddleware);
//   apiRouter.use("/questions", questionsMiddleware);
//   apiRouter.use("/history", historyMiddleware);
//   apiRouter.use("/answers", answersMiddleware);
//   apiRouter.use("/workflow_categories", workflowCatMiddleware);
//   apiRouter.use("/helps", helpsMiddleware);
//   apiRouter.use("/answers-types", answersTypeMiddleware);
//   apiRouter.use("/formulas", formulasMiddleware);
//   apiRouter.use("/timers-steps", timersStepMiddleware);
//   apiRouter.use("/states", statesMiddleware);
//   apiRouter.use("/sinistres", sinistresMiddleware);

  app.use("/api", apiRouter);
  app.use("/public", express.static(path.resolve(__dirname, "..", "static")));

  return app;
}
