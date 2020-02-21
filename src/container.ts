import express, { Router, Request } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import Database from "./lib/database";

// nos routes avec appel au bon controller
import passageRouter from './server/passage';
import adressRouter from './server/adress';
import userRouter from './server/user';

// import des bon services pour l'injection au controller
import PassageService from './services/passage.service';
import AdressService from './services/adress.service';
import UsersService from './services/users.service';
import { JWTAuthenticator } from './lib/authentication';


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
  const adressService = new AdressService(database);
  const userService = new UsersService(database);
  const authService = new JWTAuthenticator(userService);

  // Routing
  const passageMiddleware = passageRouter(passageService);
  const adressMiddleWAre = adressRouter(adressService);
  const usersMiddleware = userRouter(userService, authService);

  
  const apiRouter = Router();
  apiRouter.use('/passage', passageMiddleware);
  apiRouter.use('/adress' , adressMiddleWAre);
  apiRouter.use('/users'  , usersMiddleware);

  app.use("/api", apiRouter);
  app.use("/public", express.static(path.resolve(__dirname, "..", "static")));

  return app;
}
