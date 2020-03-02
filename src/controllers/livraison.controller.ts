import config from "../config"
import LivraisonService from '../services/livraison.service';
import { NextFunction, Request, Response } from 'express';


export class LivraisonController {
    private TABLE_NAME = config.tables.livraison

    constructor(private service: LivraisonService ) { }

    /**
     * Admin only
     */
    async getLivraisons(req: Request, res: Response, next: NextFunction) {
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(req.body);
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        
        try {
            const userTokenDecode = req.body.tokenDecoded;
            if (userTokenDecode) {
                const results = await this.service.getAllLivraison();
                console.log(results);
                res.json(results);
            }

        } catch (error) {
            next(error);
        }
    }

    async getLivraisonById(req: Request, res: Response, next: NextFunction) {
        try {
            const usertoken = req.body.tokenDecoded
            console.log(req.body);
            

            if (usertoken){
                const result = await this.service.getAllLivraisonById(usertoken.id);
                res.json(result);
            }

        } catch (error) {
            next(error)
        }
    }
}