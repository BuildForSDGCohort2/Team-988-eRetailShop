import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "category";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getCategories() {
  return await axios.get(apiEndpoint, config);
}

export async function getCategory(categoryId) {
  return await axios.get(apiEndpoint + "/" + categoryId, config);
}

export async function createCategory(category) {
  return await axios.post(apiEndpoint, category, config);
}

export async function updateCategory(categoryId, category) {
  return await axios.put(apiEndpoint + "/" + categoryId, category, config);
}

export async function deleteCategory(categoryId) {
  return await axios.delete(apiEndpoint + "/" + categoryId, config);
}
