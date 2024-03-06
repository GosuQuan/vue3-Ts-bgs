import axios from "axios";
import { ElMessage } from "element-plus";
let request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    // 这里可以添加你的全局请求处理逻辑
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 业务操作
    return res.data;
  },
  (err) => {
    let msg = "";
    const status = err.response?.status;
    switch (status) {
      case 401:
        msg = "TOKEN EXPIRED";
        break;
      case 403:
        msg = "NO AUTHORITY";
        break;
      case 404:
        msg = "NOT FOUND";
        break;
      default:
        msg = "NETWORK ERROR";
    }
    ElMessage({
      type: "error",
      message: msg,
    });
    return Promise.reject(err);
  },
);

export default request;
