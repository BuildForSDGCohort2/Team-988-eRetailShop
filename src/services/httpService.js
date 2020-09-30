import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
const tokenKey = "token";

axios.interceptors.response.use(null, (error) => {
  if (error.response.status === 401) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  if (error.response.status === 403) {
    localStorage.removeItem(tokenKey);
    window.location = "/";
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
