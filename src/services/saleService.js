import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "sales";
const clientsApiEndpoint = apiUrl + "clients";
const userApiEndpoint = apiUrl + "user";
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
  const { data: clients } = await axios.get(clientsApiEndpoint, config);
  const { data: users } = await axios.get(userApiEndpoint, config);
  const { data: products } = await axios.get(productsApiEndpoint, config);
  const clientsTransformed = clients.data.map(({ id, name, ...rest }) => ({
    ...rest,
    clientname: name,
    cid: id,
  }));
  const usersTransformed = users.data.map(({ id, ...rest }) => ({
    ...rest,
    uid: id,
  }));

  const productsTransformed = products.data.map(({ id, ...rest }) => ({
    ...rest,
    pid: id,
  }));
  return sales.data.map((t1) => ({
    ...t1,
    ...clientsTransformed.find((t2) => t2.cid === t1.customerId),
    ...usersTransformed.find((t3) => t3.uid === t1.sellerId),
    ...productsTransformed.find((t4) => t4.pid === t1.productId),
  }));
}
