import Like from "../models/like.model";
import Blog from "../models/blog.model";
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

    return { message: "Post liked" };
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
  }
};
