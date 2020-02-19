import config from "../config";
import AdressService from "../services/adress.service";
import { NextFunction, Request, Response } from "express";

export class AdressController {

  constructor(private service: AdressService) {}

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const results = await this.service.getAllAdress();
      res.json(results);
    } catch (error) {
      next(error);
    }
  }

  async createAdress(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      console.log(body);
         
      const result = await this.service.createAdress(body);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await this.service.getAdressById(id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async deletByID(req: Request, res: Response, next: NextFunction) {
    try {
      await this.service.deleteById(Number(req.params.id));
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Upodate a passage by id
   */
  async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const update = await this.service.updateById(
        Number(req.params.id),
        req.body
      );
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}
