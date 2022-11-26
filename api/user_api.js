import ApiManager from "./ApiManager";

export const user_login = async (data) => {
  try {
    const result = await ApiManager("/authentication", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      data: {
        ...data,
        strategy: "local",
      },
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const user_register = async (data) => {
  try {
    const result = await ApiManager("/users", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      data: {
        ...data,
        strategy: "local",
      },
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};

export const user_add_business = async (business, user, token) => {
  try {
    const result = await ApiManager(`/users?_id=${user}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "Authorization": token
      },
      data: {
        business,
        strategy: "local",
      },
    });
    return result;
  } catch (error) {
    return error.response.data;
  }
};
