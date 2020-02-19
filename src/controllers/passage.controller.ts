import config from "../config"
import PassageService from '../services/passage.service';
import { NextFunction, Request, Response } from 'express';


export class PassageController {
    private TABLE_NAME = config.tables.passage

    constructor(private service: PassageService) {}

    async getAll( req: Request , res: Response ,  next: NextFunction ) {
        try {
            const results = await this.service.getAllPassage();
            res.json(results);
        } catch (error) {
            next(error);
        }
    }

    async createPassage( req: Request , res: Response ,  next: NextFunction ) {
        try {
            const body = req.body;
            const result = await this.service.createPassage(body);
            res.status(200);
        } catch (error) {
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