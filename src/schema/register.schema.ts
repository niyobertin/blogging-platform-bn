import Joi from 'joi';

export const userRegisterSchema = Joi.object({
  username: Joi.string().required().messages({
    'any.required': 'Username is required',
    'string.empty': 'Username cannot be empty',
  }),
  email: Joi.string().email().optional().messages({
    'any.required': 'Email is required',
    'string.email': 'Invalid email format',
  }),
  password: Joi.string().min(6).max(20).required().messages({
    'string.min': 'Password must be at least 6 characters',
    'string.max': 'Password cannot exceed 20 characters',
    'any.required': 'Password is required',
  }),
  profilePicture: Joi.string().uri().optional().messages({
    'string.uri': 'Profile picture must be a valid URL',
  }),
  firstName: Joi.string().optional().messages({
    'string.base': 'First name must be a string',
  }),
  lastName: Joi.string().optional().messages({
    'string.base': 'Last name must be a string',
  }),
  bio: Joi.string().max(300).optional().messages({
    'string.max': 'Bio cannot exceed 300 characters',
  }),
  location: Joi.string().optional().messages({
    'string.base': 'Location must be a string',
  }),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Phone number must be 10 digits',
    }),
  gender: Joi.string().valid('Male', 'Female', 'Other').optional().messages({
    'any.only': 'Gender must be Male, Female, or Other',
  }),
  dateOfBirth: Joi.date().less('now').optional().messages({
    'date.less': 'Date of birth must be in the past',
  }),
  role: Joi.string()
  .valid('ADMIN', 'USER')
  .required()
  .messages({
    'any.required': 'Role is required',
    'string.valid': 'Role must be either ADMIN or USER',
  }),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).max(20).optional(),
  profilePicture: Joi.string().uri().optional(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  bio: Joi.string().max(300).optional(),
  location: Joi.string().optional(),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Phone number must be 10-15 digits',
    }),
  gender: Joi.string().valid('Male', 'Female', 'Other').optional(),
  dateOfBirth: Joi.date().less('now').optional(),
});
