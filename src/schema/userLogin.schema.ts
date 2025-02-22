import Joi from 'joi';

export const USerLoginSchema = Joi.object({
  username: Joi.string().messages({
    'string.base': 'Username must be a string',
  }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits',
    }),

  password: Joi.string()
    .min(6)
    .max(20)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters',
      'string.max': 'Password cannot exceed 20 characters',
      'any.required': 'Password is required',
    }),
})
  .or('username', 'phoneNumber') 
  .messages({
    'object.missing': 'You must provide either a username or a phone number',
  });
