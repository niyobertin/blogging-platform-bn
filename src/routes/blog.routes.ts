import { Router } from "express";
import { creatingBlog, deletingBlog, getBlog, getBlogs, updatingBlog } from "../controllers/blog.controller";
import { validateSchema } from "../middleware/validator";
import { blogSchema, UpdateblogSchema } from "../schema/blog.schema";
import { isLoggedIn } from "../middleware/isLoggedIn";
import { isAdmin } from "../middleware/isAdmin";
import { upload } from "../utils/upload";
const blogRoutes = Router();

blogRoutes.get("/",getBlogs);
/**
 * @swagger
 * /api/v1/blogs:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     description: Fetches a list of all blogs in the platform.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of blogs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the blog
 *                   title:
 *                     type: string
 *                     description: The title of the blog
 *                   content:
 *                     type: string
 *                     description: The content of the blog
 *                   author:
 *                     type: string
 *                     description: The name of the blog's author
 *                 example:
 *                   id: "12345"
 *                   title: "Blog Title"
 *                   content: "This is a blog content"
 *                   author: "Author Name"
 *       404:
 *         description: No blogs found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: '[]'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Unexpected error'
 */
blogRoutes.get("/:id",getBlog);
/**
 * @swagger
 * /api/v1/blogs/{id}:
 *   get:
 *     summary: Get a blog by ID
 *     tags: [Blogs]
 *     description: Fetches a blog by its unique identifier.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The unique identifier of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the blog
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the blog
 *                 title:
 *                   type: string
 *                   description: The title of the blog
 *                 content:
 *                   type: string
 *                   description: The content of the blog
 */
blogRoutes.post("/",isLoggedIn, upload.single("image"), validateSchema(blogSchema),creatingBlog);
/**
 * @swagger
 * /api/v1/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     description: Creates a new blog in the platform.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The image file for the blog
 *               content:
 *                 type: string
 *                 description: The content of the blog
 *               views:
 *                 type: number
 *                 description: The number of views the blog has
 *               likes:
 *                 type: number
 *                 description: The number of likes the blog has
 *     responses:
 *       201:
 *         description: Blog created successfully
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
 *                   example: Blog created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the blog
 *                     image:
 *                       type: string
 *                       description: URL of the uploaded image
 *                     content:
 *                       type: string
 *                       description: The content of the blog
 */

blogRoutes.patch("/:blogId",isLoggedIn, upload.single('image'),validateSchema(UpdateblogSchema),updatingBlog);
/**
 * @swagger
 * /api/v1/blogs/{blogId}:
 *   patch:
 *     summary: Update a blog
 *     tags: [Blogs]
 *     description: Updates a blog by its unique identifier.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: The unique identifier of the blog
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: The updated image file for the blog
 *               content:
 *                 type: string
 *                 description: The updated content of the blog
 *               views:
 *                 type: number
 *                 description: The updated number of views the blog has
 *               likes:
 *                 type: number
 *                 description: The updated number of likes the blog has
 *     responses:
 *       200:
 *         description: Blog updated successfully
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
 *                   example: Blog updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The unique identifier of the blog
 *                     image:
 *                       type: string
 *                       description: URL of the updated image
 *                     content:
 *                       type: string
 *                       description: The updated content of the blog
 */
blogRoutes.delete("/:blogId",isLoggedIn,deletingBlog);
/**
 * @swagger
 * /api/v1/blogs/{blogId}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     description: Deletes a blog by its unique identifier.
 *     security:
 *         - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: The unique identifier of the blog
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
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
 *                   example: Blog deleted successfully
 *       404:
 *         description: Blog not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: Blog not found
 */
export default blogRoutes;