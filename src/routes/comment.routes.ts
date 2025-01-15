import { Router } from "express";
import { createNewComment, deleteExistingComment, getCommentsByBlogId, updateExistingComment } from "../controllers/comment.controller";
import { isLoggedIn } from "../middleware/isLoggedIn";
import { validateSchema } from "../middleware/validator";
import commentSchema from "../schema/comment.schema";

const commentRoutes = Router();

commentRoutes.get("/:blogId", getCommentsByBlogId);
/**
 * @swagger
 * /api/v1/comments/{blogId}:
 *   get:
 *     summary: Get comments for a specific blog
 *     tags: [Comments]
 *     description: Fetches all comments associated with a specific blog by its ID.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog
 *     responses:
 *       200:
 *         description: Successfully fetched comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Comments fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: The ID of the comment
 *                       blogId:
 *                         type: string
 *                         description: The ID of the blog the comment belongs to
 *                       content:
 *                         type: string
 *                         description: The content of the comment
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: The time the comment was created
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching comments
 */
commentRoutes.post("/:blogId", isLoggedIn,validateSchema(commentSchema),createNewComment);
/**
 * @swagger
 * /api/v1/comments/{blogId}:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     description: Creates a new comment for a specific blog by its ID.
 *     security:
 *         - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The content of the comment
 *     responses:
 *       201:
 *         description: Successfully created comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: Comment created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the comment
 *                     blogId:
 *                       type: string
 *                       description: The ID of the blog the comment belongs to
 *                     content:
 *                       type: string
 *                       description: The content of the comment
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The time the comment was created
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while creating comment
 */
commentRoutes.patch("/:id", isLoggedIn,updateExistingComment);
/**
 * @swagger
 * /api/v1/comments/{id}:
 *   patch:
 *     summary: Update an existing comment
 *     tags: [Comments]
 *     description: Updates the content of an existing comment by its ID.
 *     security:
 *         - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: The updated content of the comment
 *     responses:
 *       200:
 *         description: Successfully updated comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Comment updated successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while updating comment
 */

commentRoutes.delete("/:id", isLoggedIn,deleteExistingComment);
/**
 * @swagger
 * /api/v1/comments/{id}:
 *   delete:
 *     summary: Delete an existing comment
 *     tags: [Comments]
 *     description: Deletes an existing comment by its ID.
 *     security:
 *         - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment
 *     responses:
 *       200:
 *         description: Successfully deleted comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Comment deleted successfully
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while deleting comment
 */



export default commentRoutes;