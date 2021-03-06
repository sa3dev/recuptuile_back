import PassageService from '../services/passage.service';
import Router from 'express';
import { PassageController } from '../controllers/passage.controller';
import validationMiddleware from '../lib/validatation-middleware';
import Joi from 'joi';
import { validations } from '../models/passage.model';
import { authorizationToken } from '../lib/authorization';



export default function (service: PassageService) {
    const router = Router();
    const controller = new PassageController(service);

    /**
     * GET ALL passage by user
     */
    router.get("/",
    authorizationToken(),
    controller.getAll.bind(controller)
    );

    /**
     * Create Passage
     */
    router.post("/", [
        // validationMiddleware("body", validations.create),
        authorizationToken(),
        controller.createPassage.bind(controller)
    ]);
    /**
     * Get By ID
     */
    router.get('/:id' , [ 
        validationMiddleware('params' , Joi.object().keys({id: Joi.number()  })),
        controller.getById.bind(controller)
     ])
    
     /**
      * Delete by id
      */
    router.delete('/:id' , [
        validationMiddleware('params' , Joi.object().keys({ id: Joi.number() })),
        controller.deletByID.bind(controller)
    ])

    /**
     * Update passage by id
     */
    router.patch('/:id' , [
        validationMiddleware('params', Joi.object().keys({ id: Joi.number() })  ),
        validationMiddleware('body' , validations.update),
        controller.updateById.bind(controller)
    ])

    return router;
}