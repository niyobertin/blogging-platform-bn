import Joi from "joi";

const commentSchema = Joi.object({
    comment: Joi.string().min(1).required().label("Comment"),
});

export const updateCommentSchema = Joi.object({
    comment: Joi.string().min(1).required().label("Comment"),
});

export default commentSchema;