import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "order";
const clientsApiEndpoint = "clients";
const userApiEndpoint = "user";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getOrders() {
  return await http.get(apiEndpoint, config);
}

export async function getOrder(orderId) {
  return await http.get(apiEndpoint + "/" + orderId, config);
}

export async function createOrder(order) {
  return await http.post(apiEndpoint, order, config);
}

export async function updateOrder(orderId, order) {
  return await http.put(apiEndpoint + "/" + orderId, order, config);
}

export async function deleteOrder(orderId) {
  return await http.delete(apiEndpoint + "/" + orderId, config);
}

export async function getOrdersDetails() {
  const { data: orders } = await http.get(apiEndpoint, config);
  const { data: clients } = await http.get(clientsApiEndpoint, config);
  const { data: users } = await http.get(userApiEndpoint, config);

  /*const ordersTransformed = orders.data.map(({ id, createdAt, ...rest }) => ({
    ...rest,
    orderCreatedAt: createdAt,
  }));*/

  const clientsTransformed = clients.data.map(
    ({ id, name, createdAt, updatedAt, ...rest }) => ({
      ...rest,
      clientname: name,
      cid: id,
      clientcreatedAt: createdAt,
      clientupdatedAt: updatedAt,
    })
  );
  const usersTransformed = users.data.map(
    ({ id, createdAt, updatedAt, ...rest }) => ({
      ...rest,
      uid: id,
      usercreatedAt: createdAt,
      userupdatedAt: updatedAt,
    })
  );

  return orders.data.map((t1) => ({
    ...t1,
    ...clientsTransformed.find((t2) => t2.cid === t1.customerId),
    ...usersTransformed.find((t3) => t3.uid === t1.sellerId),
  }));
}
