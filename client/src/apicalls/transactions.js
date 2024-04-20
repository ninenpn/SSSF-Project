const { axiosInstance } = require(".");

export const VerifyAccount = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/transactions/verify-account", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const TransferFunds = async (payload) => {
  try {
    const { data } = await axiosInstance.post("/api/transactions/transfer-funds", payload);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const GetTransactionsOfUser = async () => {
  try {
    const { data } = await axiosInstance.post("/api/transactions/get-all-transactions-by-user");
    return data;
  } catch (error) {
    return error.response.data;
  }
};