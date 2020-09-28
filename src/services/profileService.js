import http from "./httpService";
import auth from "./authService";

const apiEndpoint = "profile";
const config = { headers: { "x-auth-token": auth.getJwt() } };
export async function getProfiles() {
  return await http.get(apiEndpoint, config);
}
