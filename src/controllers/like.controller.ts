import { Request, Response } from "express";
import { checkIfUserLikedStory, toggleLike } from "../services/like.service";
import { fetchBlogById } from "../services/blogs.services";

export const toggleLikeOnBlog = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { blogId } = req.params;
  const loggedInUser = (req as any).user;

  try {
    const blog = await fetchBlogById(blogId);
    if (!blog) {
      return res.status(404).json({ status: 404, message: "Blog not found" });
    }
    const response: any = await toggleLike({
      blogId,
      authorId: loggedInUser._id,
    });

    return res.status(200).json({
      status: 200,
      message: response.message,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ status: 500, message: error.message });
    }
  }
};

export const getLikeStatus = async (req: Request, res: Response) => {
  const loggedInUser = (req as any).user;
  try {
    const { blogId } = req.params;

    const isLiked = await checkIfUserLikedStory(
      blogId,
      loggedInUser._id.toString()
    );

    res.status(200).json({ success: true, data: { isLiked } });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};
