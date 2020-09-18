import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "profile";
const config = { headers: { "x-auth-token": auth.getJwt() } };
export async function getProfiles() {
  return await axios.get(apiEndpoint, config);
}
