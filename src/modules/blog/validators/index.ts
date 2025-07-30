import Joi from 'joi';
import { celebrate, Segments } from 'celebrate';

export const postValidator = {
    post: celebrate({
        [Segments.BODY]: Joi.object({
            title: Joi.string().required(),
            content: Joi.string().required(),
            coverImageUrl: Joi.string(),
            // userId: Joi.string().required(),
        }),
    }),
};
