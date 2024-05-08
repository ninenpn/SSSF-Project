import Request from "../models/requestsModel";
import { Requests } from "../interfaces/Requests";

export default {
    Query: {
        requests: async () => {
          return await Request.find().populate('sender receiver');
        },
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        requestsById: async (_parent: undefined, args: any) => {
          return await Request.findById(args.id).populate('sender receiver');
        },
      },
    
      Mutation: {
        deleteRequest: async (_parent: undefined, args: Requests) => {
          return await Request.findByIdAndDelete(args.id);
        },
      },
    };