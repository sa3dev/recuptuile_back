import { Request, Response, NextFunction } from "express";
import createContainer from "./container";
import { NotFoundError } from "./lib/errors";
import { INTERNAL_SERVER_ERROR } from "http-status-codes";

import Database from "./lib/database";

export default async function getApplication({
  database
}: {
  database: Database;
}) {
  const app = createContainer(database);

  // Error handling

  app.use((req: Request, res: Response, next: NextFunction) => {
    const notfound = new NotFoundError();
    return next(notfound);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode) {
      if (err.message) {
        res.status(err.statusCode).json({ error: err.message });
      } else {
        res.sendStatus(err.statusCode);
      }
    } else {
      err.message && console.log(err.message);
      res.sendStatus(INTERNAL_SERVER_ERROR);
    }
  });

  return app;
}
