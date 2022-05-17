import Router from 'express';
import { LivraisonController } from '../controllers/livraison.controller';
import LivraisonService from '../services/livraison.service';
import { JWTAuthenticator } from '../lib/authentication';
import validationMiddleware from '../lib/validatation-middleware';
import Joi from "joi";
import { authorizationToken, authorizationRole } from '../lib/authorization';


export default function (service: LivraisonService) {

    const router = Router();
    const controller = new LivraisonController(service);

    /**
     * Admin purpose ther all livraison
     */
    router.get('/',
        authorizationToken(),
        authorizationRole('admin'),
        controller.getLivraisons.bind(controller)
    );


    router.get('/:id' ,
        authorizationToken(),
        authorizationRole('livreur'),
        validationMiddleware('params', Joi.object().keys({
            id: Joi.string().required()
        })),
        controller.getLivraisonById.bind(controller)
    )

    // router.post('/login',
    //     validationMiddleware("body",
    //         Joi.object().keys({
    //             email: Joi.string().required(),
    //             password: Joi.string().required()
    //         })),
    //     controller.login.bind(controller)
    // );

    // router.post('/register',
    //     validationMiddleware('body', validations.create),
    //     controller.createUser.bind(controller)
    // )

    return router;
}