import { Router } from 'express';
import { getAllAnalytics, trackClick, trackTimeSpent, trackView } from '../controllers/analyitics.controller';
import { isLoggedIn } from '../middleware/isLoggedIn';
import { isAdmin } from '../middleware/isAdmin';
const analyticsRouters = Router(); 

analyticsRouters.post('/view', trackView);
/**
 * @swagger
 * /api/v1/analytics/view:
 *   post:
 *     summary: Track a view for a post
 *     tags: [Analytics]
 *     description: Tracks a view for a specific post by incrementing the view count and optionally recording the referrer and geolocation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: The ID of the post being viewed
 *               geoLocation:
 *                 type: string
 *                 description: The geolocation data of the viewer
 *               referrer:
 *                 type: string
 *                 description: The referrer URL or source
 *             required:
 *               - blogId
 *     responses:
 *       200:
 *         description: View tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: View tracked
 *                 analytics:
 *                   type: object
 *                   properties:
 *                     blogId:
 *                       type: string
 *                       description: The ID of the post
 *                     views:
 *                       type: number
 *                       description: The total number of views
 *                     referrers:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of unique referrers
 *                     geoLocation:
 *                       type: string
 *                       description: The geolocation data of the last recorded view
 *       500:
 *         description: Error tracking view
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error tracking view
 *                 error:
 *                   type: string
 *                   description: Details of the error
 */

analyticsRouters.post('/time', trackTimeSpent);
/**
 * @swagger
 * /api/v1/analytics/time:
 *   post:
 *     summary: Track time spent on a post
 *     tags: [Analytics]
 *     description: Tracks the time spent on a specific post by incrementing the average time spent.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: The ID of the post being viewed
 *               timeSpent:
 *                 type: number
 *                 description: The time spent on the post in seconds
 *             required:
 *               - blogId
 *               - timeSpent
 *     responses:
 *       200:
 *         description: Time spent tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Time spent tracked
 *                 analytics:
 *                   type: object
 *                   properties:
 *                     blogId:
 *                       type: string
 *                       description: The ID of the post
 *                     averageTimeSpent:
 *                       type: number
 *                       description: The average time spent on the post
 *       500:
 *         description: Error tracking time spent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error tracking time spent
 *                 error:
 *                   type: string
 *                   description: Details of the error
 */
analyticsRouters.post('/click', trackClick);
/**
 * @swagger
 * /api/v1/analytics/click:
 *   post:
 *     summary: Track a click on a post
 *     tags: [Analytics]
 *     description: Tracks a click on a specific post by incrementing the click count.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               blogId:
 *                 type: string
 *                 description: The ID of the post being clicked
 *             required:
 *               - blogId
 *     responses:
 *       200:
 *         description: Click tracked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Click tracked
 *                 analytics:
 *                   type: object
 *                   properties:
 *                     blogId:
 *                       type: string
 *                       description: The ID of the post
 *                     clicks:
 *                       type: number
 *                       description: The total number of clicks
 *       500:
 *         description: Error tracking click
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error tracking click
 *                 error:
 *                   type: string
 *                   description: Details of the error
 */
analyticsRouters.get('/', isLoggedIn ,isAdmin,getAllAnalytics);
/**
 * @swagger
 * /api/v1/analytics:
 *   get:
 *     summary: Retrieve all analytics
 *     tags: [Analytics]
 *     description: Retrieves all analytics data for all posts.
 *     security:
 *         - bearerAuth: []
 *     responses:
 *       200:
 *         description: Analytics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 analytics:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       blogId:
 *                         type: string
 *                         description: The ID of the post
 *                       views:
 *                         type: number
 *                         description: The total number of views
 *                       referrers:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: List of unique referrers
 *                       geoLocation:
 *                         type: string
 *                         description: The geolocation data of the last recorded view
 *       500:
 *         description: Failed to retrieve analytics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Failed to retrieve analytics.
 *                 error:
 *                   type: string
 *                   description: Details of the error
 */
export default analyticsRouters;