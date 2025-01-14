import * as Joi from "joi";

export const userRegisterSchema = Joi.object({
    username: Joi.string().required(),
    email:Joi.string().email(),
    profilePicture: Joi.string(),
    roles: Joi.array().items(Joi.string().valid('ADMIN','USER')).required().messages({
        'array.base': 'Roles must be an array of strings',
        'array.includes': 'Roles must contain valid role(s)',
        'any.required': 'Roles are required',
      }),
    password: Joi.string().min(6).max(20).required()
});