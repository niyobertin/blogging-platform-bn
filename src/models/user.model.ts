import mongoose,{ Document, Schema } from "mongoose";


interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    roles: string[];
    createdAt: Date;
    updatedAt: Date;
  }

  const userSchema: Schema = new Schema(
    {
      username: { type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      profilePicture: { type: String },
      roles: { type: [String], default: ['USER'] },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
  );
  
const User = mongoose.model<IUser>('User', userSchema);
export default User;