import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true
});


// // 🔥 interceptor
// api.interceptors.response.use(
//   res => res,
//   async err => {
//     if (err.response?.status === 401) {
//       try {
//         await api.post("/api/auth/refresh");

//         // retry original request
//         return api(err.config);
//       } catch {
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(err);
//   }
// );

export default api;
