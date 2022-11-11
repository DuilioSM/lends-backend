import axios from "axios";

const ApiManager = axios.create({
  // baseURL: "http://172.16.100.102:3030",
  baseURL: "http://localhost:3030",
  responseType: "json",
  withCredentials: true,

});

export default ApiManager;
