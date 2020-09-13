import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "profile";

export async function getProfiles() {
  const config = {
    headers: {
      "x-auth-token": auth.getJwt(),
    },
  };
  return await axios.get(apiEndpoint, config);
}
