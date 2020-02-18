import PassageService from '../services/passage.service';
import Router from 'express';
import { PassageController } from '../controllers/passage.controller';
import validationMiddleware from '../lib/validatation-middleware';
import Joi from 'joi';


export default function (service: PassageService) {
    const router = Router();
    const controller = new PassageController(service);


    /**
     * GET ALL
     */
    router.get('/' , controller.getAll.bind(controller));

    router.get('/:id' , [ 
        validationMiddleware('params' , Joi.object().keys({id: Joi.number()  })),
        controller.getById.bind(controller)
     ])

    return router;
}