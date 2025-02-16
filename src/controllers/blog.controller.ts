import { Request,Response } from "express";
import { IBlog } from "../../type";
import { createBlog, fetchBlogs, fetchBlogById, updateBlog,deleteBlog} from "../services/blogs.services";
import { uploadMedia } from "../utils/upload";

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const blogs = await fetchBlogs();
         res.status(200).json(blogs);
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message:error.message});
        }
    }
}

export const getBlog = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const blog = await fetchBlogById(id);
        if(blog){
            res.status(200).json({
                status: 200,
                message: 'Story fetched successfully',
                data: blog,
            });
        }else{
            res.status(404).json({message:"Story not found"});
        }
    } catch (error) {
        if(error instanceof Error){
            res.status(500).json({message:error.message});
        }
    }
}

export const creatingBlog = async (req: Request, res: Response): Promise<void> => {
    const {content,views,likes} = req.body;
      const { file } = req;
        let image: any = null;
        if (file) {
          try {
            image = await uploadMedia(file);
          } catch (error) {
             console.log("File size is too big")
          }
        }
    const loggedInUser = (req as any).user;
    const blog: IBlog = {
        authorId: loggedInUser._id,
        image,
        content,
        views,
        likes,
    };

    try {
        const newBlog = await createBlog(blog);

        res.status(201).json({
            status: 201,
            message: "Story created successfully",
            data: newBlog,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unexpected error occurred." });
        }
    }
}

export const updatingBlog = async (req: Request, res: Response): Promise<void> => {
    const { blogId } = req.params; 
    const { content, views, likes } = req.body; 
    const { file } = req;
    const existingBlog = await fetchBlogById(blogId);
    if (!existingBlog) {
       res.status(404).json({ message: "Blog not found" });
       return;
    }
    let image = existingBlog.image; 
    if (file) {
      try {
        image = await uploadMedia(file);
      } catch (error) {
        console.log("File size is too big");
      }
    }
    
    try {
        const updatedBlog = await updateBlog(blogId, { image, content, views, likes });
        if (!updatedBlog) {
            res.status(404).json({
                status: 404,
                message: "Story not found",
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: "Story updated successfully",
            data: updatedBlog,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unexpected error occurred." });
        }
    }
};

export const deletingBlog = async (req: Request, res: Response): Promise<void> => {
    const { blogId } = req.params;

    try {
        const deletedBlog = await deleteBlog(blogId);
        if (!deletedBlog) {
            res.status(404).json({
                status: 404,
                message: "story not found",
            });
            return;
        }

        res.status(200).json({
            status: 200,
            message: "Story deleted successfully",
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Unexpected error occurred." });
        }
    }
};