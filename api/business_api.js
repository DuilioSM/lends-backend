import ApiManager from "./ApiManager";

export const business_getAll = async (token) => {
    try {
        const result = await ApiManager(`/business`, {
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

export const business_getById = async (business, token) => {
    try {
        const result = await ApiManager(`/business?_id=${business}`, {
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

export const business_getByCategory = async (category, token) => {
    try {
        const result = await ApiManager(`/business?category=${category}`, {
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

export const business_create = async (data, token) => {
    try {
        const result = await ApiManager("/business", {
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

export const business_update = async (data, business, token) => {
    try {
        const result = await ApiManager(`/business?_id=${business}`, {
            method: "PATCH",
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
