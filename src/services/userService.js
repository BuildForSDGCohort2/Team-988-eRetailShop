import { apiUrl } from "../config.json";
import auth from "../services/authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "user";

export async function getUsers() {
  const config = {
    headers: {
      "x-auth-token": auth.getJwt(),
    },
  };
  return await axios.get(apiEndpoint, config);
}
