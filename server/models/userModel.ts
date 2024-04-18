import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  firstName: string;
  lastName: string;
  username: string;
  dob: Date;
  email: string;
  phoneNumber: string;
  IDType: string;
  IDNumber: string;
  address: string;
  country: string;
  city: string;
  password: string;
  balance: number;
  isVerified: boolean;
  isAdmin: boolean;
}

const userSchema: Schema<UserDocument> = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  IDType: {
    type: String,
    required: true,
  },
  IDNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
