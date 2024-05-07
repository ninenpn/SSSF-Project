import mongoose, { Document } from 'mongoose';
import { User } from './User';

interface Transactions extends Document {
    amount: number;
    sender: User;
    receiver: User;
    reference: string;
    status: string;
}

interface TransactionsTest {
    id?: string;
    amount?: number;
    sender?: User;
    receiver?: User;
    reference?: string;
    status?: string;
}

export { Transactions, TransactionsTest };