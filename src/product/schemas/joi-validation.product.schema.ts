import * as Joi from "@hapi/joi";

export const productJoiSchema = Joi.object({
    name: Joi.string()
    .alphanum()
    .trim()
    .min(3)
    .max(30)
    .required(),

    description: Joi.string()
    .trim()
    .min(10)
    .max(100)
    .required(),

    imageURL: Joi.string().optional(),

    price: Joi.number().positive().precision(2).required(),

    createdAt: Joi.string().required().optional()
})