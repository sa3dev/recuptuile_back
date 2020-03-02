import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export function authorizationToken() {
  return async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;
    req.body.tokenDecoded = jwt.decode(token);
   
    next();
  };
}

export function authorizationRole(role: string) {
  return async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;
    const tokenDecoded = jwt.decode(token);

    if (role === tokenDecoded.role) {
      await next()
    } else {
      res.status(403);
    }
  }
}