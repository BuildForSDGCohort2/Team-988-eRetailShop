import http from "./httpService";
import auth from "../services/authService";

const apiEndpoint = "momopay";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function processPayment(payData) {
  return await http.post(apiEndpoint + "/pay", payData, config);
}

export async function getTransactionStatus(tnxData) {
  return await http.post(apiEndpoint + "/transactionstatus", tnxData, config);
}
