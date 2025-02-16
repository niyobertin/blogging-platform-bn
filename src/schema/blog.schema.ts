import Joi from "joi";

export const blogSchema = Joi.object({
    image:Joi.string().optional(),
    content: Joi.string().optional(),
    views: Joi.number().optional(),
    likes: Joi.number().optional(),
});

export const UpdateblogSchema = Joi.object({
    image:Joi.string().optional(),
    content: Joi.string().optional(),
    views: Joi.number().optional(),
    likes: Joi.number().optional(),
});
