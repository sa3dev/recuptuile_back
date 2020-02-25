import UsersService from "../services/users.service";
import { NextFunction, Request, Response } from "express";
import { JWTAuthenticator } from '../lib/authentication';
import bcryptHasher from "../lib/hasher";

export class UserController {
  constructor(
    private service: UsersService,
    private authService:JWTAuthenticator,
    ) {}

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await this.service.getAllUsers();
      res.json(results);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.service.findbyEmail(req.body.email);

      const password = req.body.password;
      
      if ( await bcryptHasher.verifyPassword(password, user.userpassword)) {
        const userToken = await this.authService.authenticate(user);
        res.status(200);
        res.json(userToken);
      } else {
        throw ("Wrong credentials");
      }

    } catch (error) { 
      next(error);
    }
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;      
      if ( body ) {
        body.password = await bcryptHasher.hashPassword(body.password)
      }

      const result = await this.service.insert(body);

      if (result) {
        const userToken = await this.authService.authenticate(result);
        console.log(userToken);
        res.json(userToken);
      }
    } catch (error) {
      next(error);
    }
  }

  async getUserInfo(req: Request, res: Response, next: NextFunction) {
    try {
      
      const token = req.headers.authorization;

      if (token) {
        const decodeUser = await this.authService.onUserInfo(token);
        res.json(decodeUser);
      }
      
    } catch (error) {
      next(error);
    }
  }

  async deletByID(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.deleteById(Number(req.params.id));
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const update = await this.service.update(
        Number(req.params.id),
        req.body
      );
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
