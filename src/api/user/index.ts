//manage user api
import request from "@/utils/request";
import { loginFormData, loginResponseData } from "./type";
enum API {
  LOGIN_URL = "/user/login",
  USERINFO = "/user/info",
}
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);
// export const userLogin = (data: any) => request();
