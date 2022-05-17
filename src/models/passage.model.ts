import Joi from 'joi';


export class PassageModel {
    id: number = null;
    adress_id: number = null;
    superficies: number = null;
    dateofpassage: string = null;
    isDatePassed: boolean = null;

    constructor(params) {
        // .key renvoi un tableau
        Object.keys(params).forEach( (k: string) => {
            // pour chaque valeur de params 
            // on la passera au proprieté de cette classe
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
        superficies: Joi.number().required(),
        dateofpassage: Joi.string().required(),
    }),
    update: Joi.object().keys({
        adress_id: Joi.number(),
        superficies: Joi.number(),
        dateofpassage: Joi.string(),
    })
};