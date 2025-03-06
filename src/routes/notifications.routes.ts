import { Router } from "express";
import {
  getAllNotifications,
  markNotificationAsRead,
  removeNotification,
} from "../controllers/notifications.controller";

const notificationRoutes = Router();

/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Get all notifications
 *     tags: [Notifications]
 *     description: Fetches a list of all notifications for the logged-in user.
 *     responses:
 *       200:
 *         description: Successfully retrieved notifications
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 count:
 *                   type: integer
 *                   example: 3
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "65d1c8d9f9c123456789abcd"
 *                       userId:
 *                         type: string
 *                         example: "65d1c8d9f9c987654321abcd"
 *                       message:
 *                         type: string
 *                         example: "New blog posted: Check it out!"
 *                       isRead:
 *                         type: boolean
 *                         example: false
 *       404:
 *         description: No notifications found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 data:
 *                   type: string
 *                   example: "No notifications found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unexpected error"
 */
notificationRoutes.get("/", getAllNotifications);

/**
 * @swagger
 * /api/v1/notifications/{notificationId}:
 *   patch:
 *     summary: Mark a notification as read
 *     tags: [Notifications]
 *     description: Updates a notification to mark it as read.
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         description: ID of the notification to mark as read
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification marked as read
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Notification updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "65d1c8d9f9c123456789abcd"
 *                     isRead:
 *                       type: boolean
 *                       example: true
 *       404:
 *         description: Notification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: string
 *                   example: "Notification not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unexpected error"
 */
notificationRoutes.patch("/:notificationId", markNotificationAsRead);

/**
 * @swagger
 * /api/v1/notifications/{notificationId}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     description: Deletes a notification by ID.
 *     parameters:
 *       - in: path
 *         name: notificationId
 *         required: true
 *         description: ID of the notification to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "Notification deleted successfully"
 *       404:
 *         description: Notification not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 404
 *                 error:
 *                   type: string
 *                   example: "Notification not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unexpected error"
 */
notificationRoutes.delete("/:notificationId", removeNotification);

export default notificationRoutes;
