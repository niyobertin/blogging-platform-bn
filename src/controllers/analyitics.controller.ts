import { Request, Response } from 'express';
import PostAnalytics from '../models/blogAnalytics.model';

export const getAllAnalytics = async (_req: Request, res: Response) => {
    try {
      const analytics = await PostAnalytics.find();
  
      res.status(200).json({ analytics });
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve analytics.', error });
    }
};

export const trackView = async (req: Request, res: Response) => {
    const { blogId, geoLocation, referrer } = req.body;
  
    try {
      const analytics = await PostAnalytics.findOneAndUpdate(
        { blogId },
        {
          $inc: { views: 1 },
          $addToSet: { referrers: referrer },
          geoLocation,
        },
        { new: true, upsert: true }
      );
  
      res.status(200).json({ message: 'View tracked', analytics });
    } catch (error) {
      res.status(500).json({ message: 'Error tracking view', error });
    }
};

export const trackTimeSpent = async (req: Request, res: Response) => {
    const { blogId, timeSpent } = req.body;
  
    try {
      const analytics = await PostAnalytics.findOneAndUpdate(
        { blogId },
        { $inc: { averageTimeSpent: timeSpent } },
        { new: true, upsert: true }
      );
  
      res.status(200).json({ message: 'Time spent tracked', analytics });
    } catch (error) {
      res.status(500).json({ message: 'Error tracking time spent', error });
    }
  };

export const trackClick = async (req: Request, res: Response) => {
    const { blogId } = req.body;
  
    try {
      const analytics = await PostAnalytics.findOneAndUpdate(
        { blogId },
        { $inc: { clicks: 1 } },
        { new: true, upsert: true }
      );
  
      res.status(200).json({ message: 'Click tracked', analytics });
    } catch (error) {
      res.status(500).json({ message: 'Error tracking click', error });
    }
};
  
  