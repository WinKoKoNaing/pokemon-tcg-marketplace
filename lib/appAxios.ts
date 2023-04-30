import axios from "axios";

const appAxios = axios.create({
  baseURL: "https://api.pokemontcg.io/v2",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// appAxios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     AxiosErrorHandler(error);
//     return Promise.reject(error);
//   }
// );
export default appAxios;
