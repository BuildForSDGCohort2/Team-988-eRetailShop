import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "clients";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getClients() {
  return await axios.get(apiEndpoint, config);
}

export async function getClient(clientId) {
  return await axios.get(apiEndpoint + "/" + clientId, config);
}

export async function createClient(client) {
  return await axios.post(apiEndpoint, client, config);
}

export async function updateClient(clientId, client) {
  return await axios.put(apiEndpoint + "/" + clientId, client, config);
}

export async function deleteClient(clientId) {
  return await axios.delete(apiEndpoint + "/" + clientId, config);
}
