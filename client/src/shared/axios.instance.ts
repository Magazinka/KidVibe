import axios from "axios";

const $api = axios.create({
  // baseURL: import.meta.env.VITE_URL,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let accessToken = "";

export function setBearerAccessToken(token: string) {
  accessToken = token;
}

$api.interceptors.request.use((config) => {
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error.config;
    if (error.response.status === 403 && !prevRequest.sent) {
      const response = await axios(`/tokens/refresh`, {
        withCredentials: true,
      });
      accessToken = response.data.accessToken;
      prevRequest.sent = true;
      prevRequest.headers.Authorization = `Bearer ${accessToken}`;
      return $api(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default $api;
