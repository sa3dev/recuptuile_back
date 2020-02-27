import UsersService from "../services/users.service";
import { NextFunction, Request, Response } from "express";
import { JWTAuthenticator } from '../lib/authentication';
import bcryptHasher from "../lib/hasher";
import { MailService } from '../lib/nodemail';
import * as jwt from 'jsonwebtoken';

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
      console.log("///////////////////////////");
      console.log(error);
      console.log("///////////////////////////");
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

  async updatePassword( req: Request , res: Response , next: NextFunction) {
    const body = req.body;
    try {
      if(body) {
        const passCrypt = await bcryptHasher.hashPassword(body.newpassword);
        const changepass = await this.service.changePassword(body.email, passCrypt)
        res.sendStatus(204);
      }
      throw("email or password not valid")
    } catch (error) {
      throw error
    }
  }

  /**
   * 
   * Envoi de mail pour oublie de mot de passe 
   */
  async onPasswordForgotten(req: Request , res: Response , next: NextFunction) {
    try {
      const email = req.body.emailForgottenpassword;

      const userToken = await jwt.sign(
        { email: email },
        process.env.SECRET_KEY,
        { expiresIn: 60 * 60 }
      );
      
      const testMail = await MailService.resetPassword(
        email,
        userToken,
      );
    
      res.json(testMail);

    } catch (error) {
      console.log(error); 
    }
  }

  /**
   * Create new password for forgotten password
   */
  async createNewResetPassword(req: Request , res: Response , next: NextFunction) {
    try {
      const token = req.headers.authorization;
      const newpassword = await bcryptHasher.hashPassword(req.body.password)

      if (token) {
        const user = await this.authService.onUserInfo(token);
        
        const updatePass = await this.service.changePassword(
          user .email,
          newpassword
        );

        const userToken = await this.authService.authenticate(user);

        res.json(userToken);       
      }
    } catch (error) {
      next(error)
    }
  }
}
