import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "clients";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getClients() {
  return await http.get(apiEndpoint, config);
}

export async function getClient(clientId) {
  return await http.get(apiEndpoint + "/" + clientId, config);
}

export async function createClient(client) {
  return await http.post(apiEndpoint, client, config);
}

export async function updateClient(clientId, client) {
  return await http.put(apiEndpoint + "/" + clientId, client, config);
}

export async function deleteClient(clientId) {
  return await http.delete(apiEndpoint + "/" + clientId, config);
}
