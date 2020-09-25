import { apiUrl } from "../config.json";
import auth from "../services/authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "momopay";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function processPayment(payData) {
  return await axios.post(apiEndpoint + "/pay", payData);
}

export async function getTransactionStatus(tnxData) {
  return await axios.post(apiEndpoint + "/transactionstatus", tnxData);
}
