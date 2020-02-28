import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';

export function authorizationToken() {
  return async (req: Request, res: Response, next: NextFunction) => {

    const token = req.headers.authorization;

    req.body.tokenDecoded = jwt.decode(token);
   
    
    await next();
  };
}
