import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";
const axios = require("axios");

const apiEndpoint = apiUrl + "auth";
const tokenKey = "token";

export async function login(username, password) {
  const jwt = await axios.post(apiEndpoint, { username, password });
  if (jwt.status === 200) localStorage.setItem(tokenKey, jwt.data);
  return "OK";
}

export async function updateFirstLogin(userId, user) {
  const { data: response } = await axios.put(apiEndpoint + "/" + userId, user);
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
