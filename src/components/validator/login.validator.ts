import Joi from "joi";

export const loginValidator = Joi.object({
    username: Joi.string().valid('emilys', 'avah').required(),
    password: Joi.string().valid('emilyspass', 'avahpass').required(),
});
