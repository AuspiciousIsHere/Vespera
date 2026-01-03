import mongoose from "mongoose";

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  usernameSlug: string;
  email: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[][];
  picture: string;
  bio: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  passwordChangedAt: Date;
  passwordResetToken: string;
  passwordResetExpires: Date;
  active: string;
  chat: mongoose.Types.ObjectId[];
  reddit: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}
