import { Request, Response } from "express";
import {
  getNotifications,
  updateNotification,
  deleteNotification,
} from "../services/notifications.service";

export const getAllNotifications = async (req: Request, res: Response) => {
  try {
    const notifications = await getNotifications();
    res.status(200).json({
      message: "Notification fetched successfully",
      notifications,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const updatedNotification = await updateNotification(notificationId);
    res.status(200).json({
      message: "Notification is read",
      updatedNotification,
    });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export const removeNotification = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    const deletedNotification = await deleteNotification(notificationId);
    res
      .status(200)
      .json({ message: "Notification deleted", deletedNotification });
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};
