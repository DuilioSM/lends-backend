import axios from "axios";
import { NativeModules } from "react-native";
import url from "url";

export function getApiUrl() {
  if (__DEV__) {
    const { hostname } = url.parse(NativeModules.SourceCode.scriptURL);
    return `http://${hostname}:3030`;
  } else {
    return "https://lends-backend.onrender.com";
  }
}

const ApiManager = axios.create({
  baseURL: getApiUrl(),
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
