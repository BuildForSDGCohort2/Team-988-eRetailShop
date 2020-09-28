import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "products";
const categoryApiEndpoint = "category";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getProducts() {
  return await http.get(apiEndpoint, config);
}

export async function getProduct(productId) {
  return await http.get(apiEndpoint + "/" + productId, config);
}

export async function getProductByCateg(categId) {
  return await http.get(apiEndpoint + "/categ/" + categId, config);
}

export async function createProduct(product) {
  return await http.post(apiEndpoint, product, config);
}

export async function updateProduct(productId, product) {
  return await http.put(apiEndpoint + "/" + productId, product, config);
}

export async function deleteProduct(productId) {
  return await http.delete(apiEndpoint + "/" + productId, config);
}

export async function getProductCategory() {
  const { data: products } = await http.get(apiEndpoint, config);
  const { data: categories } = await http.get(categoryApiEndpoint, config);
  const categoriesTransformed = categories.data.map(
    ({ id, name, ...rest }) => ({
      ...rest,
      categoryname: name,
      cid: id,
    })
  );
  return products.data.map((t1) => ({
    ...t1,
    ...categoriesTransformed.find((t2) => t2.cid === t1.categoryId),
  }));
}
