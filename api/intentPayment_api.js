import ApiManager from "./ApiManager";

export const payment_create = async (data, token) => {
    try {
        const result = await ApiManager("/payment-intent", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            },
            data: {
                ...data,
            },
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};