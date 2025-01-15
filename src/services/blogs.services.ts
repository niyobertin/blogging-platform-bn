import { IBlog } from "../../type";
import Blog from "../models/blog.model";

export const createBlog = async (blog: IBlog): Promise<IBlog> => {
    // Check if the blog title already exists
    const existingBlog = await Blog.findOne({ title: blog.title });
    if (existingBlog) {
        throw new Error(`Blog with title "${blog.title}" already exists.`);
    }

    // Create and return the new blog
    const newBlog = await Blog.create({
        authorId: blog.authorId.toString(),
        title: blog.title,
        content: blog.content,
        views: blog.views,
        likes: blog.likes,
    });

    return newBlog as unknown as IBlog;
}

export const fetchBlogs = async (): Promise<IBlog[]> => {
    const blogs:any = await Blog.find();
    return blogs;
};

export const fetchBlogById = async (blogId: string): Promise<IBlog | null> => {
    const blog:any = await Blog.findOne({ _id: blogId });
    return blog;
};

export const updateBlog = async (blogId: string, blog: Partial<IBlog>): Promise<IBlog | null> => {
    const updatedBlog: any = await Blog.findOneAndUpdate(
        { _id: blogId },
        { $set: blog },
        { new: true, runValidators: true } 
    );
    return updatedBlog;
};

export const deleteBlog = async (blogId: string): Promise<IBlog | null> => {
    const deletedBlog:any = await Blog.findOneAndDelete({ _id: blogId });
    return deletedBlog;
}