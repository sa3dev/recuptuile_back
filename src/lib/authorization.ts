// import { NextFunction, Request, Response } from "express";
// import UserModel from '../models/user.model';
// import { UserController } from '../controllers/user.controller';

// export function authentication(authenticator) {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const token = req.headers.authorization;
//     const user = await authenticator.validate(token);

//     await next();
//   };
// }
