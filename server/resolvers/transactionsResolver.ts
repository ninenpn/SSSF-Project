import Transaction from "../models/transactionsModel";
import { Transactions } from "../interfaces/Transactions";

export default {
    Query: {
        transactions: async () => {
          return await Transaction.find();
        },
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        transactionById: async (_parent: undefined, args: any) => {
          return await Transaction.findById(args.id);
        },
      },
    
      Mutation: {
        deleteTransaction: async (_parent: undefined, args: Transactions) => {
          return await Transaction.findByIdAndDelete(args.id);
        },
      },
    };