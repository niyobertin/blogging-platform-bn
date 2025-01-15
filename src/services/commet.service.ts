import { IComment } from "../../type";
import Comment from "../models/comment.model";

export const createComment = async (content: IComment) => {
  try {
    const newComment = await Comment.create({
        blogId: content.blogId,
        authorId: content.authorId,
        comment: content.comment,
    });
    return newComment;
  } catch (error) {
    if(error instanceof Error) throw new Error(error.message);
  }
};

export const getComments = async (blogId: string) => {
  try {
    const comments = await Comment.find({ blogId });
    return comments;
    } catch (error) {
      if(error instanceof Error) throw new Error(error.message);
    }
}
export const updateComment = async (commentId: string, content: any) => {
    try {
        await Comment.findByIdAndUpdate
        (commentId, {
            content,
        });
    } catch (error) {
        if(error instanceof Error) throw new Error(error.message);
    }
}
export const deleteComment = async (commentId: string) => {
  try {
    await Comment.findByIdAndDelete(commentId);    
    } catch (error) {
        if(error instanceof Error) throw new Error(error.message);
        }
}