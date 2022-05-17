import express, { Router, Request } from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import Database from "./lib/database";

// nos routes avec appel au bon controller
import passageRouter from './server/passage';
import userRouter from './server/user';
import LivraisonRouter from './server/livraison';

import { JWTAuthenticator } from './lib/authentication';

// import des bon services pour l'injection au controller
import PassageService from './services/passage.service';
import UsersService from './services/users.service';
import LivraisonService from './services/livraison.service';


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
  const userService = new UsersService(database);
  const authService = new JWTAuthenticator(userService);
  const livraisonService = new LivraisonService(database);

  // Routing
  const passageMiddleware = passageRouter(passageService) ;
  const usersMiddleware = userRouter(userService, authService);
  const livraisonMiddleware = LivraisonRouter(livraisonService );

  
  const apiRouter = Router();
  apiRouter.use('/passage', passageMiddleware);
  apiRouter.use('/users'  , usersMiddleware);
  apiRouter.use('/livraison' , livraisonMiddleware);

  app.use("/api", apiRouter);
  app.use("/public", express.static(path.resolve(__dirname, "..", "static")));

  return app;
}
