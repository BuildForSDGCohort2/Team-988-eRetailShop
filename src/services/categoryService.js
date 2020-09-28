import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "category";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getCategories() {
  return await http.get(apiEndpoint, config);
}

export async function getCategory(categoryId) {
  return await http.get(apiEndpoint + "/" + categoryId, config);
}

export async function createCategory(category) {
  return await http.post(apiEndpoint, category, config);
}

export async function updateCategory(categoryId, category) {
  return await http.put(apiEndpoint + "/" + categoryId, category, config);
}

export async function deleteCategory(categoryId) {
  return await http.delete(apiEndpoint + "/" + categoryId, config);
}
