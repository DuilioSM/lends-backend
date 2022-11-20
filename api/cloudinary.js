import axios from "axios";

const cloudinaryApi = axios.create({
    // baseURL: "http://172.16.100.102:3030",
    baseURL: "https://api.cloudinary.com/v1_1/dlxr7cwuy/upload",
    responseType: "json",
    withCredentials: true,
});

export default cloudinaryApi;
