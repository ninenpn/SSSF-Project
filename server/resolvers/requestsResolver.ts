import Request from "../models/requestsModel";
import { Requests } from "../interfaces/Requests";

export default {
    Query: {
        requests: async () => {
            try {
                return await Request.find().populate('sender receiver');
            } catch (error) {
                console.error("Failed to retrieve requests:", error);
                throw new Error("Error retrieving requests.");
            }
        },
        request: async (_, { id }) => {
            try {
              const request = await Request.findById(id).populate('sender receiver');
              if (!request) {
                throw new Error('Request not found');
              }
              return request;
            } catch (error) {
              console.error("Failed to retrieve request:", error);
              throw new Error("Error retrieving the request.");
            }
          },
    },

    Mutation: {
        async createRequest(_: any, { amount, sender, receiver, description, status }: Requests) {
            const newRequest = new Request({
                amount,
                sender,
                receiver,
                description,
                status,
            });
            try {
                const request = await newRequest.save();
                return request;
            } catch (err) {
                throw new Error(err);
            }
        },
        async updateRequest(_: any, { id, amount, sender, receiver, description, status }: Requests) {
            try {
                const request = await Request.findByIdAndUpdate(id, { amount, sender, receiver, description, status }, { new: true });
                return request;
            } catch (err) {
                throw new Error(err);
            }
        },        
        async deleteRequest(_: any, { id }: Requests) {
            try {
                await Request.findByIdAndDelete(id);
                return 'Request deleted successfully';
            } catch (err) {
                throw new Error(err);
            }
        },
    },
};