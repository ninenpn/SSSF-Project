import { User } from "../interfaces/User";
import userModel from "../models/userModel";

export default {
    Query: {
        users: async () => {
            try {
                return await userModel.find();
            } catch (error) {
                console.error("Failed to retrieve users:", error);
                throw new Error("Error retrieving users.");
            }
        },
    },
    
    Mutation: {
        createUser: async (_parent: undefined, args: User) => {
            try {
                const newUser = new userModel(args);
                return await newUser.save();
            } catch (error) {
                console.error("Failed to create user:", error);
                throw new Error("Error creating user.");
            }
        },
      
        updateUser: async (_parent: undefined, args: { id: string; data: User }) => {
            try {
                const updatedUser = await userModel.findByIdAndUpdate(args.id, args.data, { new: true });
                if (!updatedUser) {
                    throw new Error(`User with ID ${args.id} not found.`);
                }
                return updatedUser;
            } catch (error) {
                console.error("Failed to update user:", error);
                throw new Error("Error updating user.");
            }
        },
      
        deleteUser: async (_parent: undefined, args: { id: string }) => {
            try {
                const deletedUser = await userModel.findByIdAndDelete(args.id);
                if (!deletedUser) {
                    throw new Error(`User with ID ${args.id} not found.`);
                }
                return deletedUser;
            } catch (error) {
                console.error("Failed to delete user:", error);
                throw new Error("Error deleting user.");
            }
        },
    },
}
