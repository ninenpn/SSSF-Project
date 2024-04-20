import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    reference: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;