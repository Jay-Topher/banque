import mongoose from 'mongoose';

interface UserSchema extends mongoose.Document {
  firstName: string;
  lastName: string;
  phone: string;
  bvn: string;
  email: string;
  password: string;
  pin: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    lastName: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    bvn: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      index: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    pin: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<UserSchema>('users', userSchema);
