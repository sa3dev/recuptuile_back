import PassageService from '../services/passage.service';
import Router from 'express';
import { PassageController } from '../controllers/passage.controller';


export default function (service: PassageService) {
    const router = Router();
    const controller = new PassageController(service);


    /**
     * GET ALL
     */
    router.get('/' , controller.getAll.bind(controller) )

    return router;
}