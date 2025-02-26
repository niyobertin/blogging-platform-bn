import { Schema, Document, model } from 'mongoose';

interface IUser extends Document {
  username: string;
  email?: string;
  password: string;
  profilePicture?: string;
  firstName?: string;
  lastName?: string;
  bio?: string;
  location?: string;
  website?: string;
  phoneNumber?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  gender?: 'Male' | 'Female' | 'Other';
  dateOfBirth?: Date;
  roles: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, unique: false},
    password: { type: String, required: true },
    profilePicture: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    bio: { type: String, maxlength: 300 },
    location: { type: String },
    phoneNumber: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    dateOfBirth: { type: Date },
    role: { type: String, default: 'USER' },
  },
  { timestamps: true }
);

export default model<IUser>('User', userSchema);
