import mongoose, { Document, Schema } from 'mongoose';

interface IComment extends Document {
  blogId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

const CommentSchema: Schema = new Schema(
  {
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>('Comment', CommentSchema);
export default Comment;
