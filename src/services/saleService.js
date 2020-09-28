import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "sale";
const productsApiEndpoint = "products";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getSales() {
  return await http.get(apiEndpoint, config);
}

export async function getSale(saleId) {
  return await http.get(apiEndpoint + "/" + saleId, config);
}

export async function createSale(sale) {
  return await http.post(apiEndpoint, sale, config);
}

export async function updateSale(saleId, sale) {
  return await http.put(apiEndpoint + "/" + saleId, sale, config);
}

export async function deleteSale(saleId) {
  return await http.delete(apiEndpoint + "/" + saleId, config);
}

export async function getSalesDetails() {
  const { data: sales } = await http.get(apiEndpoint, config);
  const { data: products } = await http.get(productsApiEndpoint, config);
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
