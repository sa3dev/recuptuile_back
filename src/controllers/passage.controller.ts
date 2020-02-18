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

    async getById(req: Request , res: Response ,  next: NextFunction) {
        try {
            const id = Number(req.params.id);
            const result = await this.service.getPassageById(id);
            res.json(result)
        } catch (error) {
            throw error;
        }
    }
}