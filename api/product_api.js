import ApiManager from "./ApiManager";

export const product_getAll = async (token) => {
    try {

        const result = await ApiManager(`/products?_business=637cd0f727ee10693fce1990`, {
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

export const product_by_business = async (token, business) => {
    try {
        const result = await ApiManager(`/products?_business=${business}`, {
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

export const product_create = async (data, token) => {
    try {
        const result = await ApiManager("/products", {
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
