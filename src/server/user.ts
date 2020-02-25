import Router from 'express';
import { UserController } from '../controllers/user.controller';
import UsersService from '../services/users.service';
import { JWTAuthenticator } from '../lib/authentication';
import validationMiddleware from '../lib/validatation-middleware';
import Joi from "joi";
import { validations } from '../models/user.model';


export default function(service: UsersService , authService: JWTAuthenticator) {

    const router = Router();
    const controller = new UserController(service, authService);

    router.get('/' ,
    controller.getAllUsers.bind(controller));


    router.post('/login',
    validationMiddleware("body", 
    Joi.object().keys({ 
        email: Joi.string().required() , 
        password: Joi.string().required()
    })),
    controller.login.bind(controller)
    );

    router.post('/register',
    validationMiddleware('body' , validations.create),
    controller.createUser.bind(controller)
    )

    router.get('/me',
    controller.getUserInfo.bind(controller)
    )

    router.post('/changepassword' , 
    controller.updatePassword.bind(controller)
    )

    return router;
}