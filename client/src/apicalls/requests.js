import { axiosInstance } from ".";
import Requests from "../pages/requests";

export const GetAllRequestByUser = async() => {
    try {
        const {data} = await axiosInstance.post("/api/requests/get-all-request-by-user");
        return data; 
    } catch (error) {
        return error.response.data;
    }
};

export const SentRequest = async(data) => {
    try {
        const data = await axiosInstance.post("/api/requests/send-request");
        return data;
    } catch (error) {
        return error.response.data;
    }
};