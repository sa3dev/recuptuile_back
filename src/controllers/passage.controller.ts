import config from "../config"
import PassageService from '../services/passage.service';
import { NextFunction, Request, Response } from 'express';


export class PassageController {
    private TABLE_NAME = config.tables.passage

    constructor(private service: PassageService ) {}

    async getAll( req: Request , res: Response ,  next: NextFunction ) {
        try {

            const userTokenDecode = req.body.tokenDecoded;
            
            if(userTokenDecode) {
                const results = await this.service.getAllPassageByID(userTokenDecode.id);
                console.log(results);
                res.json(results);
            } 
            // else {
            //     res.sendStatus(404);
            // } 
            

        } catch (error) {
            next(error);
        }
    }

    async createPassage( req: Request , res: Response ,  next: NextFunction ) {
        try {
            
            const obj = {
                adress: req.body.adress ,
                superficies: req.body.superficies,
                dateofpassage: req.body.dateofpassage,
                user_id: req.body.tokenDecoded.id
            }
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
            console.log(obj);
            console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
            
            const test = await this.service.createPassage(obj);
            
            console.log(test);

            res.sendStatus(204); // une réponse 204 est sans body / une 200 attend un body est parse la réponse ( sa fait peter au niveau du parse )

        } catch (error) {
            console.log(error);
          next(error);
        }
    }

    async getById(req: Request , res: Response ,  next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const result = await this.service.getPassageById(id);
            res.json(result)
        } catch (error) {
            next(error);
        }
    }

    async deletByID(req: Request , res: Response ,  next: NextFunction) {
        try {
            await this.service.deleteById( Number(req.params.id));
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Upodate a passage by id
     */
    async updateById(req: Request ,res: Response , next: NextFunction) {
        try {
            const update = await this.service.updateById(Number(req.params.id) , req.body);
            res.sendStatus(204)
        } catch (err) {
            next(err);
        }
    }
}