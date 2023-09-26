import { ITicket } from '../models/Ticket';
import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';

export const ValidateWithJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error) {
      console.log(error);
      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  ticket: {
    create: Joi.object<ITicket>({
      client: Joi.string().required(),
      issue: Joi.string().required(),
      deadline: Joi.date().required(),
    }),
    update: Joi.object<ITicket>({
      client: Joi.string().required(),
      issue: Joi.string().required(),
      status: Joi.string().required(),
      deadline: Joi.date().required(),
    }),
  },
};
