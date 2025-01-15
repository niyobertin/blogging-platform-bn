import Joi from "joi";

export const blogSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    views: Joi.number().optional(),
    likes: Joi.number().optional(),
});

export const UpdateblogSchema = Joi.object({
    title: Joi.string().optional(),
    content: Joi.string().optional(),
    views: Joi.number().optional(),
    likes: Joi.number().optional(),
});
