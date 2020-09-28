import http from "./httpService";
import auth from "../services/authService";

const apiEndpoint = "user";
const profileApiEndpoint = "profile";

const config = { headers: { "x-auth-token": auth.getJwt() } };

export async function getUser(userId) {
  return await http.get(apiEndpoint + "/" + userId, config);
}

export async function getUsersProfiles() {
  const { data: users } = await http.get(apiEndpoint, config);
  const { data: profiles } = await http.get(profileApiEndpoint, config);
  const profilesTransformed = profiles.data.map(({ id, ...rest }) => ({
    ...rest,
    pid: id,
  }));

  return users.data.map((t1) => ({
    ...t1,
    ...profilesTransformed.find((t2) => t2.pid === t1.profileid),
  }));
}

export async function createUser(user) {
  return await http.post(apiEndpoint, user);
}

export async function updateUser(userId, user) {
  return await http.put(apiEndpoint + "/" + userId, user, config);
}

export async function deleteUser(userId) {
  return await http.delete(apiEndpoint + "/" + userId, config);
}
