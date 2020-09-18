import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "products";
const categoryApiEndpoint = apiUrl + "category";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getProducts() {
  return await axios.get(apiEndpoint, config);
}

export async function getProduct(productId) {
  return await axios.get(apiEndpoint + "/" + productId, config);
}

export async function createProduct(product) {
  return await axios.post(apiEndpoint, product, config);
}

export async function updateProduct(productId, product) {
  return await axios.put(apiEndpoint + "/" + productId, product, config);
}

export async function deleteProduct(productId) {
  return await axios.delete(apiEndpoint + "/" + productId, config);
}

export async function getProductCategory() {
  const { data: products } = await axios.get(apiEndpoint, config);
  const { data: categories } = await axios.get(categoryApiEndpoint, config);
  const categoriesTransformed = categories.data.map(
    ({ id, name, ...rest }) => ({
      ...rest,
      categoryname: name,
      cid: id,
    })
  );
  return products.data.map((t1) => ({
    ...t1,
    ...categoriesTransformed.find((t2) => t2.cid === t1.categoryId),
  }));
}
