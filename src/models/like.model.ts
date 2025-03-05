import mongoose, { Document, Schema } from "mongoose";

interface ILike extends Document {
  blogId: mongoose.Types.ObjectId;
  authorId: mongoose.Types.ObjectId;
}

const LikeSchema: Schema = new Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

LikeSchema.index({ blogId: 1, authorId: 1 }, { unique: true });

const Like = mongoose.model<ILike>("Like", LikeSchema);
export default Like;
