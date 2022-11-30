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

export const orders_getAll = async (customer, token) => {
    try {
        // `/orders?customer=${customer}`
        const result = await ApiManager(`/orders?customer=${customer}`, {
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

export const orders_getByBusiness = async (business, token) => {
    try {
        const result = await ApiManager(`/orders?business=${business}`, {
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

export const order_updateStatus = async (status, order, token) => {
    try {
        const result = await ApiManager(`/orders?_id=${order}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "Authorization": token
            },
            data: {
                status,
                strategy: "local",
            },
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};