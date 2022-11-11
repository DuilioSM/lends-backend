import ApiManager from "./ApiManager";

export const order_create = async (data, token) => {
    try {
        const result = await ApiManager("/orders", {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            },
            data: {
                ...data,
                strategy: "local",
            },
        });
        return result;
    } catch (error) {
        return console.log(error);
    }
};

export const orders_getAll = async (token, customer) => {
    try {
        // `/orders?customer=${customer}`
        const result = await ApiManager(`/orders?customer=635bf9778bacf4021c9b873a`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            }
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};