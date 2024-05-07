import mongoose, { Document } from 'mongoose';
import { User } from './User';

interface Requests extends Document {
    sender: User;
    receiver: User;
    amount: number;
    description: string;
    status: string;
}

interface RequestsTest {
    id?: string;
    sender?: User;
    receiver?: User;
    amount?: number;
    description?: string;
    status?: string;
}

export { Requests, RequestsTest };