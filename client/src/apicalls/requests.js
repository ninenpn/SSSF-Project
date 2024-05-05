import { axiosInstance } from ".";

export const GetAllRequestByUser = async() => {
    try {
        const {data} = await axiosInstance.post("/api/requests/get-all-request-by-user");
        return data; 
    } catch (error) {
        return error.response.data;
    }
};

export const SentRequest = async (data) => {
    try {
        const response = await axiosInstance.post("/api/requests/send-request", data);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const UpdateRequestStatus = async (request) => {
    try {
        const {data} = await axiosInstance.post("/api/requests/update-request-status", request);
        return data;
    } catch (error) {
        return error.response.data;
    }
};
