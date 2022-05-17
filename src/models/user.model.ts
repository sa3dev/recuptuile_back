import Joi from "joi";

export default class UserModel {
    id: number          = null;
    full_name: string   = null;
    email: string       = null;
    type: string        = null;
    phonenumber: string = null;
    password: string    = null;
        
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
    full_name:  Joi.string().required(),
    email:      Joi.string().email().required(),
    type:       Joi.string().required(),
    phonenumber:Joi.string().required(),
    password:   Joi.string().required(),
  }),
  update: Joi.object().keys({
    full_name:  Joi.string(),
    email:      Joi.string().email(),
    type:       Joi.string(),
    phonenumber:Joi.string(),
    password:   Joi.string(),
  })
};
