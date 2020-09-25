import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "order";
const clientsApiEndpoint = apiUrl + "clients";
const userApiEndpoint = apiUrl + "user";

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

export async function getOrdersDetails() {
  const { data: orders } = await axios.get(apiEndpoint, config);
  const { data: clients } = await axios.get(clientsApiEndpoint, config);
  const { data: users } = await axios.get(userApiEndpoint, config);
  const clientsTransformed = clients.data.map(({ id, name, ...rest }) => ({
    ...rest,
    clientname: name,
    cid: id,
  }));
  const usersTransformed = users.data.map(({ id, ...rest }) => ({
    ...rest,
    uid: id,
  }));

  return orders.data.map((t1) => ({
    ...t1,
    ...clientsTransformed.find((t2) => t2.cid === t1.customerId),
    ...usersTransformed.find((t3) => t3.uid === t1.sellerId),
  }));
}
