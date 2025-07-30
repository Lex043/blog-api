import Joi from 'joi';
import { celebrate, Segments } from 'celebrate';

export const authValidator = {
    register: celebrate({
        [Segments.BODY]: Joi.object({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
    login: celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    }),
};
