import { apiUrl } from "../config.json";
import auth from "./authService";
const axios = require("axios");

const apiEndpoint = apiUrl + "purchases";
const suppliersApiEndpoint = apiUrl + "suppliers";
const productsApiEndpoint = apiUrl + "products";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getPurchases() {
  return await axios.get(apiEndpoint, config);
}

export async function getPurchase(purchaseId) {
  return await axios.get(apiEndpoint + "/" + purchaseId, config);
}

export async function createPurchase(purchase) {
  return await axios.post(apiEndpoint, purchase, config);
}

export async function updatePurchase(purchaseId, purchase) {
  return await axios.put(apiEndpoint + "/" + purchaseId, purchase, config);
}

export async function deletePurchase(purchaseId) {
  return await axios.delete(apiEndpoint + "/" + purchaseId, config);
}

export async function getPurchaseSuppliersProducts() {
  const { data: purchases } = await axios.get(apiEndpoint, config);
  const { data: suppliers } = await axios.get(suppliersApiEndpoint, config);
  const { data: products } = await axios.get(productsApiEndpoint, config);
  const suppliersTransformed = suppliers.data.map(({ id, ...rest }) => ({
    ...rest,
    sid: id,
  }));
  const productsTransformed = products.data.map(({ id, ...rest }) => ({
    ...rest,
    pid: id,
  }));

  return purchases.data.map((t1) => ({
    ...t1,
    ...suppliersTransformed.find((t2) => t2.sid === t1.supplierid),
    ...productsTransformed.find((t3) => t3.pid === t1.productid),
  }));
}
