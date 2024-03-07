//用户相关小仓库
import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import { SET_TOKEN, GET_TOKEN } from "@/utils/token";

import type { LoginFormData, loginResponseData } from "@/api/type";
import type { UserState } from "./types/type";
const useUserStore = defineStore("User", {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
    };
  },
  actions: {
    async userLogin(data: LoginFormData) {
      const result: loginResponseData = await reqLogin(data);
      if (result.code == 200) {
        this.token = result.data.token as string;
        SET_TOKEN(this.token);
        return "ok";
      }
      //ERROR
      else {
        return Promise.reject(new Error(result.data.message));
      }
    },
  },
  getters: {},
});

export default useUserStore;
