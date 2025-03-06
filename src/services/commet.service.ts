import { IComment } from "../../type";
import Comment from "../models/comment.model";
import Blog from "../models/blog.model";
import Notification from "../models/notification.model";
import { io, onlineUsers } from "../app";

export const createComment = async (content: IComment) => {
  try {
    const newComment = await Comment.create({
      blogId: content.blogId,
      authorId: content.authorId,
      comment: content.comment,
    });
    const blog = await Blog.findById(content.blogId);
    if (!blog) throw new Error("Blog not found");

    const notification = await Notification.create({
      userId: blog.authorId,
      message: `Someone commented on your post!`,
      blogId: blog._id,
    });

    if (onlineUsers.has(blog.authorId.toString())) {
      io.to(onlineUsers.get(blog.authorId.toString())!).emit("blog_commented", {
        message: `Someone commented on your post!`,
        blogId: blog._id,
      });
    }

    return newComment;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};

export const getComments = async (blogId: string) => {
  try {
    const comments = await Comment.find({ blogId });
    return comments;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
export const updateComment = async (commentId: string, content: any) => {
  try {
    await Comment.findByIdAndUpdate(commentId, {
      content,
    });
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
export const deleteComment = async (commentId: string) => {
  try {
    await Comment.findByIdAndDelete(commentId);
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
