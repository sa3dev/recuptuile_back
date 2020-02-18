import config from "../config"
import PassageService from '../services/passage.service';
import { NextFunction } from 'express';


export class PassageController {
    private TABLE_NAME = config.tables.passage

    constructor(private service: PassageService) {}

    async getAll( req: Request , res: Response ,  next: NextFunction ) {
        try {
            const results = await this.service.getAllPassage();
            console.log( '////////////////RESUTAT  ' + results);
            res.json(); //  res.json(results);
        } catch (error) {
            next(error);
        }
    }

}