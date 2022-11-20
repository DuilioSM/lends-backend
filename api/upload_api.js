import axios from "axios";
// import cloudinaryApi from "./cloudinary";

export const upload_image = async (formData) => {
    try {
        const result = await axios({
            url: "https://api.cloudinary.com/v1_1/dlxr7cwuy/upload",
            method: "POST",
            headers: {
                "content-type": "multipart/form-data",
            },
            data: formData,
        });
        return result;
    } catch (error) {
        return error.response.data;
    }
};


