import Like from "../models/like.model";
import Blog from "../models/blog.model";;
import Notification from "../models/notification.model";
import { io, onlineUsers } from "../app"; 
import { ILike } from "../../type";
import mongoose from "mongoose";

export const toggleLike = async (like: ILike) => {
  try {
    const { blogId, authorId } = like;

    if (!mongoose.Types.ObjectId.isValid(blogId)) {
      throw new Error("Invalid blog ID");
    }

    const existingLike = await Like.findOne({ blogId, authorId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      await Blog.findByIdAndUpdate(blogId, { $inc: { likes: -1 } });
      return { message: "Like removed" };
    }

    await Like.create({ blogId, authorId });
    await Blog.findByIdAndUpdate(blogId, { $inc: { likes: 1 } });

    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found");

    const notification = await Notification.create({
      userId: blog.authorId,
      message: `Someone liked your post!`,
      blogId: blog._id,
    });

    if (onlineUsers.has(blog.authorId.toString())) {
      io.to(onlineUsers.get(blog.authorId.toString())!).emit("blog_liked", {
        message: `Someone liked your post!`,
        blogId: blog._id,
      });
    }


    return { message: "Post liked" };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
