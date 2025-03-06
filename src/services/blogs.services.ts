import { IBlog } from "../../type";
import Blog from "../models/blog.model";
import Notification from "../models/notification.model";
import User from "../models/user.model";
import { io, onlineUsers } from "../app";

export const createBlog = async (blog: IBlog): Promise<IBlog> => {
  const existingBlog = await Blog.findOne({ content: blog.content });
  if (existingBlog) {
    throw new Error(`Story already exists.`);
  }

  // Create and return the new blog
  const newBlog = await Blog.create({
    authorId: blog.authorId.toString(),
    image: blog.image,
    content: blog.content,
    views: blog.views,
    likes: blog.likes,
  });

  const users = await User.find({}, "_id");

  const notifications = users.map((user) => ({
    userId: user._id,
    message: `New blog posted: ${newBlog.content.slice(0, 50)}...`,
    blogId: newBlog._id,
  }));
  await Notification.insertMany(notifications);

  users.forEach((user: any) => {
    if (onlineUsers.has(user._id)) {
      io.to(onlineUsers.get(user._id)!).emit("new_blog", {
        message: `New blog posted: ${newBlog.content.slice(0, 50)}...`,
        blogId: newBlog._id,
      });
    }
  });
  return newBlog as unknown as IBlog;
};

export const fetchBlogs = async (): Promise<IBlog[]> => {
  const blogs: any = await Blog.find().sort({ createdAt: -1 });
  return blogs;
};

export const fetchBlogById = async (blogId: string): Promise<IBlog | null> => {
  const blog: any = await Blog.findOne({ _id: blogId });
  return blog;
};

export const updateBlog = async (
  blogId: string,
  blog: Partial<IBlog>
): Promise<IBlog | null> => {
  const updatedBlog: any = await Blog.findOneAndUpdate(
    { _id: blogId },
    { $set: blog },
    { new: true, runValidators: true }
  );
  return updatedBlog;
};

export const deleteBlog = async (blogId: string): Promise<IBlog | null> => {
  const deletedBlog: any = await Blog.findOneAndDelete({ _id: blogId });
  return deletedBlog;
};
