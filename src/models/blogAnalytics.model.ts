import mongoose, { Document, Schema } from 'mongoose';

interface IBlogAnalytics extends Document {
  postId: mongoose.Types.ObjectId;
  views: number;
  uniqueVisitors: number;
  averageTimeSpent: number;
  clicks: number;
  geoLocation: {
    country: string;
    city: string;
  };
  referrers: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const PostAnalyticsSchema: Schema = new Schema(
  {
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    views: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    averageTimeSpent: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    geoLocation: {
      country: { type: String },
      city: { type: String },
    },
    referrers: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const BlogAnalytics = mongoose.model<IBlogAnalytics>('BlogAnalytics', PostAnalyticsSchema);
export default BlogAnalytics;
