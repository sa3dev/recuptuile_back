import Joi from "joi";

export default class AdressModel {
  id: number = null;
  adress: string = null;
  gmap_x: number = null;
  gmap_y: string = null;


  constructor(params) {
    Object.keys(params).forEach((k: string) => {
      this[k] = params[k];
    });
  }

  toJSON(): Object {
    return this;
  }
}

export const validations = {
  create: Joi.object().keys({
    adress: Joi.string().required(),
    gmap_x: Joi.number().required(),
    gmap_y: Joi.number().required(),
  }),
  update: Joi.object().keys({
    adress: Joi.string(),
    gmap_x: Joi.number(),
    gmap_y: Joi.number(),
  })
};
