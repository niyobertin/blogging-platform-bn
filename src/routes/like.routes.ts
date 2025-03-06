import { Router } from "express";
import {
  getLikeStatus,
  toggleLikeOnBlog,
} from "../controllers/like.controller";
import { isLoggedIn } from "../middleware/isLoggedIn";

const likeRoute = Router();

/**
 * @swagger
 * /api/v1/likes/{blogId}:
 *   post:
 *     summary: Toggle like/unlike for a blog post
 *     description: Allows the user to like or unlike a blog post by toggling the like status.
 *     tags:
 *       - Likes
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: The ID of the blog to like/unlike
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []  # If you use token-based authentication
 *     responses:
 *       200:
 *         description: The like status of the blog post has been toggled successfully.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Internal server error.
 */
likeRoute.post("/:blogId", isLoggedIn, toggleLikeOnBlog);
/**
 * @swagger
 * /api/v1/likes/{blogId}/like-status:
 *   get:
 *     summary: get like status
 *     description: Allows the user to get the like status.
 *     tags:
 *       - Likes
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: The ID of the blog to get like status
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The like status of the blog post has been toggled successfully.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Internal server error.
 */
likeRoute.get("/:blogId/like-status", isLoggedIn, getLikeStatus);

export default likeRoute;
