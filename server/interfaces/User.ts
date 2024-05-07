import mongoose, { Document } from 'mongoose';

interface User extends Document {
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

interface UserTest {
    id?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    dob?: Date;
    email?: string;
    phoneNumber?: string;
    IDType?: string;
    IDNumber?: string;
    address?: string;
    country?: string;
    city?: string;
    password?: string;
    balance?: number;
    isVerified?: boolean;
    isAdmin?: boolean;
}

export { User, UserTest };