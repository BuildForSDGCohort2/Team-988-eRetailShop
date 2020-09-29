import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = "auth";
const tokenKey = "token";

export async function login(username, password) {
  const jwt = await http.post(apiEndpoint, { username, password });
  if (jwt.status === 200) localStorage.setItem(tokenKey, jwt.data);
  return "OK";
}

export async function updateFirstLogin(userId, user) {
  const { data: response } = await http.put(apiEndpoint + "/" + userId, user);
  if (response.data.status === 1) return "OK";
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  updateFirstLogin,
};
