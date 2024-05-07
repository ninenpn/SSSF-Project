import Transaction from "../models/transactionsModel";
import { Transactions } from "../interfaces/Transactions";

export default {
    Query: {
        transactions: async () => {
            try {
                return await Transaction.find().populate('sender receiver');
            } catch (error) {
                console.error("Failed to retrieve transactions:", error);
                throw new Error("Error retrieving transactions.");
            }
        },
        transaction: async (_, { id }) => {
            try {
              const transaction = await Transaction.findById(id).populate('sender receiver');
              if (!transaction) {
                throw new Error('Transaction not found');
              }
              return transaction;
            } catch (error) {
              console.error("Failed to retrieve transaction:", error);
              throw new Error("Error retrieving the transaction.");
            }
          },
        },

    Mutation: {
        async createTransaction(_: any, { amount, sender, receiver, reference, status }: Transactions) {
            const newTransaction = new Transaction({
                amount,
                sender,
                receiver,
                reference,
                status,
            });
            try {
                const transaction = await newTransaction.save();
                return transaction;
            } catch (err) {
                throw new Error(err);
            }
        },
        async updateTransaction(_: any, { id, amount, sender, receiver, reference, status }: Transactions) {
            try {
                const transaction = await Transaction.findByIdAndUpdate(id, { amount, sender, receiver, reference, status }, { new: true });
                return transaction;
            } catch (err) {
                throw new Error(err);
            }
        },        
        async deleteTransaction(_: any, { id }: Transactions) {
            try {
                await Transaction.findByIdAndDelete(id);
                return 'Transaction deleted successfully';
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};