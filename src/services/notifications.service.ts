import Notification from "../models/notification.model";

export const getNotifications = async () => {
  try {
    const notifications = await Notification.find();
    return notifications;
  } catch (error) {
    throw new Error(`Registration failed: ${(error as any).message}`);
  }
};

export const updateNotification = async (id: string) => {
  try {
    const existingNotification = await Notification.findById(id);

    if (!existingNotification) {
      throw new Error("Notification not found");
    }

    existingNotification.isRead = true;
    await existingNotification.save();

    return existingNotification;
  } catch (error) {
    throw new Error(`Failed to update notification: ${(error as any).message}`);
  }
};

export const deleteNotification = async (id: string) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(id);
    if (!deletedNotification) {
      throw new Error("Notification not found");
    }
    return deletedNotification;
  } catch (error) {
    throw new Error(`Failed to delete notification: ${(error as any).message}`);
  }
};
