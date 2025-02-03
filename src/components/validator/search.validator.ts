import Joi from "joi";

export const searchValidator = Joi.object({
    searching: Joi.string().min(1).max(25).pattern(/^(?:[A-Za-z\s]+|\d+)$/).messages({
        "string.pattern.base": "You can use chars with 'space' or number. Not together",
        "string.max": "Cannot be greater then 25 chars",
        "string.min": "Can be at least 3 chars",
    })
});