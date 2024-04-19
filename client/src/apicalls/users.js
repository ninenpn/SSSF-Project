import { axiosInstance } from ".";

export const LoginUsers = async (payload) => {
    try {
        const { data } = await axiosInstance.post('api/users/login', payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const RegisterUsers = async (payload) => {
    try {
        const { data } = await axiosInstance.post('api/users/register', payload);
        return data;
    } catch (error) {
        return error.response.data;
    }
}

export const GetUserInfo = async () => {
    try {
        const { data } = await axiosInstance.post('api/users/get-user-info');
        return data;
    } catch (error) {
        return error.response.data;
    }
}