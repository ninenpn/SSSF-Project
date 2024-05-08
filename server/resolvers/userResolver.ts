import { User } from "../interfaces/User";
import userModel from "../models/userModel";

export default {
    Query: {
        users: async () => {
          return await userModel.find();
        },
    
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userById: async (_parent: undefined, args: any) => {
          return await userModel.findById(args.id);
        },
      },
    
      Mutation: {
        createUser: async (_parent: undefined, args: User) => {
          const newUser = new userModel(args);
          return await newUser.save();
        },
    
        updateUser: async (_parent: undefined, args: User) => {
          return await userModel.findByIdAndUpdate(args.id, args, {new: true});
        },
    
        deleteUser: async (_parent: undefined, args: User) => {
          return await userModel.findByIdAndDelete(args.id);
        },
      },
    };
