import { Request,Response } from "express";
import { createComment, getComments, updateComment, deleteComment } from "../services/commet.service";
import { fetchBlogById } from "../services/blogs.services";
import { IComment } from "../../type";

export const getCommentsByBlogId = async (req: Request, res: Response) => {
    const { blogId } = req.params;
    try {
        const comments = await getComments(blogId);
        res.status(200).json({
            status: 200,
            message: "Comments fetched successfully",
            data: comments,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export const createNewComment = async (req: Request, res: Response) => {
    const { blogId } = req.params;
    const { comment } = req.body;
    const loggedInUser = (req as any).user;
    try {
        const isBlogExist = await fetchBlogById(blogId);
        if (!isBlogExist) {
            res.status(404).json({ message: "Blog not found" });
        }else{
            const commentData: IComment = {
                blogId,
                authorId: loggedInUser._id,
                comment,
            };
            const newComment = await createComment(commentData);
            res.status(201).json({
                status: 201,
                message: "Comment created successfully",
                data: newComment,
            });
        }

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export const updateExistingComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
        await updateComment(id, {
            content,
        });
        res.status(200).json({
            status: 200,
            message: "Comment updated successfully",
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export const deleteExistingComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteComment(id);
        res.status(200).json({
            status: 200,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
    }
};