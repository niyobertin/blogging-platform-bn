import mongoose, { Document, Schema } from 'mongoose';

interface IBlog extends Document {
  authorId: mongoose.Types.ObjectId;
  title: string;
  content: string;
  views: number;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>('Blog', PostSchema);
export default Blog;
