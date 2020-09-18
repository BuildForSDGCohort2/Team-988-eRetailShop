import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "orders";
const productApiEndpoint = apiUrl + "products";
const clientApiEndpoint = apiUrl + "clients";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getOrders() {
  return await axios.get(apiEndpoint, config);
}

export async function getOrder(orderId) {
  return await axios.get(apiEndpoint + "/" + orderId, config);
}

export async function createOrder(order) {
  return await axios.post(apiEndpoint, order, config);
}

export async function updateOrder(orderId, order) {
  return await axios.put(apiEndpoint + "/" + orderId, order, config);
}

export async function deleteOrder(orderId) {
  return await axios.delete(apiEndpoint + "/" + orderId, config);
}

export async function getOrdersProductClient() {
  const { data: orders } = await axios.get(apiEndpoint, config);
  const { data: products } = await axios.get(productApiEndpoint, config);
  const { data: clients } = await axios.get(clientApiEndpoint, config);
  const productsTransformed = products.data.map(({ id, ...rest }) => ({
    ...rest,
    pid: id,
  }));
  const clientsTransformed = clients.data.map(({ id, name, ...rest }) => ({
    ...rest,
    clientname: name,
    cid: id,
  }));

  return orders.data.map((t1) => ({
    ...t1,
    ...productsTransformed.find((t2) => t2.pid === t1.productid),
    ...clientsTransformed.find((t3) => t3.cid === t1.clientid),
  }));
}
