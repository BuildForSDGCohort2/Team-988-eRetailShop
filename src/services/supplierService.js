import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "suppliers";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getSuppliers() {
  return await axios.get(apiEndpoint, config);
}

export async function getSupplier(supplierId) {
  return await axios.get(apiEndpoint + "/" + supplierId, config);
}

export async function createSupplier(supplier) {
  return await axios.post(apiEndpoint, supplier, config);
}

export async function updateSupplier(supplierId, supplier) {
  return await axios.put(apiEndpoint + "/" + supplierId, supplier, config);
}

export async function deleteSupplier(supplierId) {
  return await axios.delete(apiEndpoint + "/" + supplierId, config);
}
