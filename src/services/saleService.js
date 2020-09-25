import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "sale";
const productsApiEndpoint = apiUrl + "products";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getSales() {
  return await axios.get(apiEndpoint, config);
}

export async function getSale(saleId) {
  return await axios.get(apiEndpoint + "/" + saleId, config);
}

export async function createSale(sale) {
  return await axios.post(apiEndpoint, sale, config);
}

export async function updateSale(saleId, sale) {
  return await axios.put(apiEndpoint + "/" + saleId, sale, config);
}

export async function deleteSale(saleId) {
  return await axios.delete(apiEndpoint + "/" + saleId, config);
}

export async function getSalesDetails() {
  const { data: sales } = await axios.get(apiEndpoint, config);
  const { data: products } = await axios.get(productsApiEndpoint, config);
  const productsTransformed = products.data.map(
    ({ id, createdAt, updatedAt, ...rest }) => ({
      ...rest,
      pid: id,
      pCreatedAt: createdAt,
      pUpdatedAt: updatedAt,
    })
  );
  return sales.data.map((t1) => ({
    ...t1,
    ...productsTransformed.find((t2) => t2.pid === t1.productId),
  }));
}
