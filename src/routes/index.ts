import { Router, Request, Response } from "express";
import userRoutes from "./user.routes";
import blogRoutes from "./blog.routes";

const appRoutes = Router();

/**
 * @swagger
 * /api/v1/health-check:
 *   get:
 *     summary: Health check endpoint
 *     tags: [Health Check]
 *     description: Returns a welcome message for the blogging platform.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Welcome to our blogging platform!
 */
appRoutes.get('/health-check', (req: Request, res: Response) => {
    res.status(200).json({ 
        status:200,
        message: 'Welcome to our blogging platform!' 
    });
});

appRoutes.use('/users',userRoutes);
appRoutes.use('/blogs',blogRoutes);
export default appRoutes;
